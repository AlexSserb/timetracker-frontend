import React, { Component } from "react";
import JobModal from './job-modal.component';
import { Table } from "reactstrap";
import jobService from "../../services/job.service";

// List of job editor
class JobEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: { job: { id: "", name: "" } },
      jobsList: []
    };

    this.refreshList();
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    jobService.getAllJobs()
      .then(res => this.setState({ jobsList: res.data }))
      .catch(err => console.log(err));
  };
 
  renderItems = () => {
    return this.state.jobsList.map((job) => (
      <tr> 
        <td>{job.name}</td>
        <div>
          <button
            onClick={() => this.editItem(job)}
            className="btn btn-secondary"
          >
            Edit
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
    if (item.job.id) {
      // if old post to edit and submit
      jobService.putJob(item)
        .then(() => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
		alert(JSON.stringify(item));
    // if new post to submit
    jobService.postJob(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
 
  // Delete item
  handleDelete = (item) => {
    jobService.deleteProject(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
  
  // Create item
  createItem = () => {
    this.setState({ modal: !this.state.modal });
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: { job: { id: item.id, name: item.name }}, modal: !this.state.modal });
  };
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Должности
        </h3>
        <div className="col-md-3 col-sm-60 mx-auto p-0">
          <div className="mb-2">
            <button onClick={this.createItem} className="btn btn-info">
              Добавить должность
            </button>
          </div>
          <Table> 
            <thead> 
              <tr>
                <th>Название должности</th>
              </tr> 
            </thead> 
            <tbody> 
              {this.renderItems()}
            </tbody> 
          </Table>
        </div>
        {this.state.modal ? (
          <JobModal
						activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default JobEditor;