import React, { Component } from "react";
import DayModal from "./timesheet-modal.component";
import TimesheetService from "../../services/timesheet.service";
import { Input, Form, Table } from "reactstrap";
import moment from "moment";
import projectService from "../../services/project.service";


// Work day editor
// User edit list with projects, times and comments.
class TimesheetEditor extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        workTime: "",
        projectId: "",
        description: "",
        date: ""
      },
      isFinished: false,
      userId: props.userId,
      day: props.day.format(this.dayFormat),
      projectsList: [],
      allProjectsList: [],
      sumWorkTime: 0
    };

    this.refreshList();
    this.setProjectList();
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    // Get list of timesheets for current day
    TimesheetService.getTimesheetsForCurrentDay(this.state.day)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ isFinished: res.data[0].finished });
        }
        else {
          this.setState({ isFinished: false });
        }
        this.setState({ projectsList: res.data });
        this.calcSumWorkTime(res.data);
      })
      .catch(err => console.log(err));
  };
 
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <tr> 
        <td>{project.workTime} ч.</td>
        <td>{project.project.name}</td> 
        <td>{project.description}</td>
        { this.state.isFinished ? "" : (
          <div>
            <button
              onClick={() => this.editItem(project)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => this.handleDelete(project)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        )}
      </tr>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
 
  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    item.userId = this.state.userId;
    if (item.id) {
      // if old post to edit and submit
      TimesheetService.putTimesheet(item)
        .then(() => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
    // if new post to submit
    TimesheetService.postTimesheet(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
 
  // Delete item
  handleDelete = (item) => {
    TimesheetService.deleteTimesheet(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
  
  // Create item
  createItem = () => {
    const item = { 
      projectId: "", userId: this.state.userId, 
      workTime: "", description: "", 
      date: this.state.day, finished: false
    };
    item.workTime = 4;
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Send (make day FINISHED)
  makeItemsFinished = () => {
    let timesheetIDs = [];

    for (let i = 0; i < this.state.projectsList.length; i++) {
      this.state.projectsList[i].finished = true;
      timesheetIDs.push(this.state.projectsList[i].id);
    }

    TimesheetService.putTimesheetsFinished(timesheetIDs)
      .catch(err => console.log(err));;
    this.refreshList();
  };

  handleChangeDate = e => {
    this.setState({day: moment(e.target.value).format(this.dayFormat)})
  };

  // Set list of all projects
  setProjectList = () => {
    projectService.getAllProjects()
      .then(res => {
        let projects = res.data.map(proj => { return { value: proj.id, label: proj.name }});
        
        this.setState({ allProjectsList: projects });
      })
      .catch(err => console.log(err));
  };

  calcSumWorkTime = (projectsList) => {
    let sum = 0;
    projectsList.forEach((proj) => sum += proj.workTime);
    this.setState({ sumWorkTime: sum });
  }
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Рабочий день {this.state.day}
        </h3>
        <div className="col-md-6 col-sm-60 mx-auto p-0">
          <Form className="col-md-3 col-sm-10 mx-auto p-0"><Input
            type="date"
            name="day"
            value={this.state.day}
            onChange={this.handleChangeDate}
            onBlur={this.refreshList}
          /></Form>
          { this.state.isFinished ? "" : (
            <div className="">
              <button onClick={this.createItem} className="btn btn-info m-2">
                Добавить проект
              </button>
              <button onClick={this.makeItemsFinished} className="btn btn-success m-2" 
                disabled={this.state.projectsList.length === 0}>
                Отправить
              </button>
              <div>
                Часов отработано: {this.state.sumWorkTime}
              </div>
            </div>
          )}
          { 
            this.state.projectsList.length > 0 ? 
            <Table className="mt-4"> 
              <thead> 
                <tr> 
                  <th>Время</th> 
                  <th>Проект</th>
                  <th>Комментарий</th> 
                </tr> 
              </thead> 
              <tbody> 
                {this.renderItems()}
              </tbody> 
            </Table> 
            : <div className="mt-3">Нет таймшитов для данной даты</div>
          }
        </div>
        {this.state.modal ? (
          <DayModal
            activeItem={this.state.activeItem}
            allProjectsList={this.state.allProjectsList}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default TimesheetEditor;