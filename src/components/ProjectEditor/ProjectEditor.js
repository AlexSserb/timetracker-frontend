import React, { Component } from "react";
import axios from 'axios';  
import ProjectModal from './ProjectModal';
import moment from 'moment';
import { Table } from "reactstrap";

// List of projects editor
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
    // Get list of all projects
    axios
      .get(`http://127.0.0.1:8080/dictionary/project`)
      .then(res => this.setState({ projectsList: res.data }))
      .catch(err => console.log(err));
  };
 
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <tr> 
        <td>{project.name}</td>
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
        <div className="col-md-3 col-sm-60 mx-auto p-0">
          { this.state.isFinished ? "" : (
            <div className="mb-2">
              <button onClick={this.createItem} className="btn btn-info">
                Добавить проект
              </button>
            </div>
          )}
          <Table> 
            <thead> 
              <tr>
                <th>Проект</th>
              </tr> 
            </thead> 
            <tbody> 
              {this.renderItems()}
            </tbody> 
          </Table>
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