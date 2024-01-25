import React, { Component } from "react";
import ProjectModal from './ProjectModal';
import { Table } from "reactstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import ProjectService from "../../services/ProjectService";

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
    ProjectService.getAllActiveProjects()
      .then(res => this.setState({ projectsList: res.data }))
      .catch(err => console.log(err));
  };
 
  renderItems = () => {
    return this.state.projectsList.map((project) => (
      <tr> 
        <td>{project.name}</td>
        <td>
          <Button onClick={() => this.editItem(project)}>
            <EditIcon/>
          </Button>
          <Button onClick={() => this.handleDelete(project)}>
            <DeleteIcon/>
          </Button>
        </td>
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
          Projects
        </h3>
        <div className="col-md-3 col-sm-60 mx-auto p-0">
          <div className="mb-2">
            <button onClick={this.createItem} className="btn btn-info">
              Add project
            </button>
          </div>
          <Table striped> 
            <thead> 
              <tr>
                <th>Project</th>
                <th></th>
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