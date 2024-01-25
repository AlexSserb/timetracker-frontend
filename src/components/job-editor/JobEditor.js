import React, { Component } from "react";
import JobModal from './JobModal';
import { Table } from "reactstrap";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import jobService from "../../services/JobService";

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
 
  componentDidMount = () => {
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
        <td>
          <Button onClick={() => this.editItem(job)}>
            <EditIcon/>
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
    if (item.job.id) {
      // if old post to edit and submit
      jobService.putJob(item)
        .then(() => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
    // if new post to submit
    jobService.postJob(item)
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
          Positions at work
        </h3>
        <div className="col-md-3 col-sm-60 mx-auto p-0">
          <div className="mb-2">
            <button onClick={this.createItem} className="btn btn-info">
              Add a position
            </button>
          </div>
          <Table striped> 
            <thead> 
              <tr>
                <th>Name of position</th>
                <th></th>
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