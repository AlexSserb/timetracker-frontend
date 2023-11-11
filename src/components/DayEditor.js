import React, { Component } from "react";
import axios from 'axios';  
import DayModal from './DayModal';
import { Input, Form } from "reactstrap";
import moment from 'moment';

// Редактор рабочего дня.
// Пользователь редактирует список с проектами, временем и комментариями.
class DayEditor extends Component {
  dayFormat = "YYYY-MM-DD";

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        time: "",
        projectId: "",
        description: "",
        date: ""
      },
      isFinished: false,
      day: props.day.format(this.dayFormat),
      projectsList: []
    };
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    // Получение списка таймшитов для данного дня
    axios
      .get(`http://127.0.0.1:8080/timesheet/day/${this.state.day}`)
      .then(res => this.setState({ projectsList: res.data }))
      .catch(err => console.log(err));
    //if (this.state.projectsList.length > 0) {
    //  this.setState({ isFinished: this.state.projectsList[0].finished });
    //}
  };
 
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <li
        key={project.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        
        <span>{ project.worktime }</span> 
        <span>{ project.projectId }</span>
        <span>{ project.description }</span>
        
        { this.state.isFinished ? "" : (
          <div>
            <button
              onClick={() => this.editItem(project)}
              className="btn btn-secondary mr-2"
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
      </li>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
 
  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    alert("save" + JSON.stringify(item));
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://127.0.0.1:8080/timesheet/day/${item.id}/`, item)
        .then(() => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post(`http://127.0.0.1:8080/timesheet/day/`, item)
      .then(() => this.refreshList());
  };
 
  // Delete item
  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
      .delete(`http://127.0.0.1:8080/timesheet/day/${item.id}/`)
      .then((res) => this.refreshList());
  };
  
  // Create item
  createItem = () => {
    const item = { worktime: "", projectId: "", description: "", finished: false, date: this.state.day };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Send (make day FINISHED)
  makeItemsFinished = () => {
    for (let i = 0; i < this.state.projectsList.length; i++) {
      this.state.projectsList[i].finished = true;
      axios.put(`http://127.0.0.1:8080/timesheet/day/${this.state.projectsList[i].id}/`, this.state.projectsList[i]);
    }
    this.refreshList();
  }

  handleChangeDate = e => {
    this.setState({day: moment(e.target.value).format(this.dayFormat)})
  }
 
  render() {
    return (
      <div>
        <h2 className="text-success text-uppercase text-center my-4">
          Рабочий день {this.state.day}
        </h2>
        <div className="row ">
          <Form><Input
            type="date"
            name="day"
            value={this.state.day}
            defaultValue={this.state.day}
            onChange={this.handleChangeDate}
            onBlur={this.refreshList}
          /></Form>
          { this.state.isFinished ? "" : (
            <div className="">
              <button onClick={this.createItem} className="btn btn-info">
                Добавить проект
              </button>
              <button onClick={this.makeItemsFinished} className="btn btn-success">
                Отправить
              </button>
            </div>
          )}
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <DayModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default DayEditor;