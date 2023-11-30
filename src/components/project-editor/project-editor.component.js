import React, { Component } from "react";
import ProjectModal from './project-modal.component';
import { Table } from "reactstrap";
import ProjectService from "../../services/project.service";

// List of projects editor
class ProjectEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curProjectId: -1,
      projectsList: []
    };

    this.refreshList();
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    ProjectService.getAllProjects()
      .then(res => this.setState({ projectsList: res.data }))
      .catch(err => console.log(err));
  };
 
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <tr> 
        <td>{project.name}</td>
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
      </tr>
    ));
  };
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
 
 
  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    if (item.project.id) {
      // if old post to edit and submit
      ProjectService.putProject(item)
        .then(() => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
    // if new post to submit
    ProjectService.postProject(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
 
  // Delete item
  handleDelete = (item) => {
    ProjectService.deleteProject(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
  
  // Create item
  createItem = () => {
    this.setState({ curProjectId: -1, modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ curProjectId: item.id, modal: !this.state.modal });
  };
 
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
            curProjectId={this.state.curProjectId}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default ProjectEditor;