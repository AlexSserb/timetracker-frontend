import React, { Component } from "react";
import DayModal from "./TimesheetModal";
import TimesheetService from "../../services/TimesheetService";
import { Input, Form, Table } from "reactstrap";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import projectService from "../../services/ProjectService";


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
        <td>{project.workTime} h.</td>
        <td>{project.project.name}</td> 
        <td>{project.description}</td>
        { this.state.isFinished ? "" : (
          <td>
            <Button onClick={() => this.editItem(project)}>
              <EditIcon/>
            </Button>
            <Button onClick={() => this.handleDelete(project)} >
              <DeleteIcon/>
            </Button>
          </td>
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
      projectId: "", workTime: "", description: "", 
      date: this.state.day, finished: false
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    item.projectId = item.project.id;
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
      .then((res) => this.refreshList())
      .catch(err => console.log(err));
  };

  handleChangeDate = e => {
    this.setState({day: moment(e.target.value).format(this.dayFormat)})
  };

  // Set list of all projects
  setProjectList = () => {
    projectService.getAllActiveProjects()
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
          Working day {this.state.day}
        </h3>
        <div className="col-md-6 col-sm-60 mx-auto p-0">
          <Form className="col-md-3 col-sm-10 mx-auto p-0">
            <Input
              type="date"
              name="day"
              value={this.state.day}
              onChange={this.handleChangeDate}
              onBlur={this.refreshList}
            />
          </Form>
          { this.state.isFinished ? "" : (
            <div className="">
              <button onClick={this.createItem} className="btn btn-info m-2">
                Add project
              </button>
              <button onClick={this.makeItemsFinished} className="btn btn-success m-2" 
                disabled={this.state.projectsList.length === 0}>
                Send and block
              </button>
              <div>
                Hours worked: {this.state.sumWorkTime}
              </div>
            </div>
          )}
          { 
            this.state.projectsList.length > 0 ? 
            <Table className="mt-4" striped> 
              <thead> 
                <tr> 
                  <th>Time</th> 
                  <th>Project</th>
                  <th>Comment</th> 
                  <th></th>
                </tr> 
              </thead> 
              <tbody> 
                {this.renderItems()}
              </tbody> 
            </Table> 
            : <div className="mt-3">There are no timesheets for this date</div>
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