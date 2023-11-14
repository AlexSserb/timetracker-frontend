import React, { Component } from "react";
import axios from 'axios';  
import ProjectModal from './ProjectModal';
import moment from 'moment';

// Редактор списка проектов.
class ProjectEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        name: ""
      },
      projectsList: []
    };

    this.refreshList();
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    // Получение списка проектов
    axios
      .get(`http://127.0.0.1:8080/dictionary/project`)
      .then(res => this.setState({ projectsList: res.data }))
      .catch(err => console.log(err));
  };
 
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <li
        key={project.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        
        <span>{ project.name }</span>
        
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
        .put(`http://127.0.0.1:8080/dictionary/project`, item)
        .then(() => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post(`http://127.0.0.1:8080/dictionary/project/${item.name}`)
      .then(() => this.refreshList());
  };
 
  // Delete item
  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
      .delete(`http://127.0.0.1:8080/dictionary/project/${item.id}`)
      .then((res) => this.refreshList());
  };
  
  // Create item
  createItem = () => {
    const item = { 
      name: ""
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  handleChangeDate = e => {
    this.setState({day: moment(e.target.value).format(this.dayFormat)})
  }
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Проекты
        </h3>
        <div className="row ">
          { this.state.isFinished ? "" : (
            <div className="">
              <button onClick={this.createItem} className="btn btn-info">
                Добавить проект
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
          <ProjectModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default ProjectEditor;