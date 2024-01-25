import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';

import userService from "../../services/UserService";
import UserModal from "./UserModal";
import jobsService from "../../services/JobService";
import { Alert } from "@mui/material";


const alertTypes = Object.freeze({ 
  NONE: 0, 
  SUCCESS: 1, 
  ERROR: 2
}); 

class UserEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        userAuth: {
					id: "",
					login: "", 
					managerRole: false,
          password: "",
          isActive: true,
					user: {
						id: "",
						name: "",
						isActive: "",
						job: { id: "", name: "" }
					}
				}
      },
      usersList: [],
      allJobsList: [],
      alertResendResult: alertTypes.NONE
    };

    this.refreshList();
    this.setJobsList();
  }
 
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList = () => {
    userService.getAllUsersAuth()
      .then(res => {
        this.setState({ usersList: res.data });
      })
      .catch(err => console.log(err));
  }
 
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.usersList.map((obj) => (
      <tr> 
        <td>{obj.userAuth.user.name}</td>
				<td>{obj.userAuth.login}</td>
        <td>{obj.userAuth.managerRole ? "Yes" : "No"}</td> 
				<td>{obj.userAuth.user.job.name}</td>
        <td>
          <Button className="px-0" onClick={() => this.editItem(obj)}>
            <EditIcon/>
          </Button>
          <Button className="px-0" onClick={() => this.handleDelete(obj.userAuth)} >
            <DeleteIcon/>
          </Button>
          <Button className="px-0" onClick={() => this.resendPsw(obj)}>
            <EmailIcon/>
          </Button>
        </td>
      </tr>
    ));
  }
 
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
 
 
  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    if (item.userAuth.id) {
      // if old post to edit and submit
      userService.putUserAuth(item)
        .then(() => this.refreshList())
        .catch(err => console.log(err));
      return;
    }
    // if new post to submit
    userService.postUserAuth(item)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  setAlertResendResultNone = () => {
    this.setState({ alertResendResult: alertTypes.NONE });
  }
 
  handleDelete = (item) => {
    this.setAlertResendResultNone();

    userService.deleteUser(item.user)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  
  // Create item
  createItem = () => {
    this.setAlertResendResultNone();

    const item = { 
      userAuth: {
				id: "",
				login: "", 
				managerRole: false,
        password: "",
				user: {
					id: "",
					name: "",
					isActive: true,
					job: { id: "", name: "" }
				}
      },
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal, successMsg: false });
  }

  // Resend password
  resendPsw = (item) => {
    userService.resendPswUserAuth(item)
      .then(res => this.setState({ alertResendResult: alertTypes.SUCCESS }))
      .catch(err => {
        console.log(err);
        this.setState({ alertResendResult: alertTypes.ERROR });
      });
  }

  // Set list of all projects
  setJobsList = () => {
    jobsService.getAllJobs()
      .then(res => {
        let jobs = res.data.map(job => { return { value: job.id, label: job.name }});
        
        this.setState({ allJobsList: jobs });
      })
      .catch(err => console.log(err));
  }

  getAlertResendResult = () => {
    if (this.state.alertResendResult === alertTypes.SUCCESS) {
      return <Alert variant="outlined">The new password has been sent to the email.</Alert>;
    }
    if (this.state.alertResendResult === alertTypes.ERROR) {
      return <Alert variant="outlined" severity="error">Error. The new password could not be sent to the email.</Alert>;
    }
    return <div></div>;
  }
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Users
        </h3>
        <div className="col-md-8 col-sm-80 mx-auto p-0">        
          <div className="">
            <button onClick={this.createItem} className="btn btn-info m-3">
              Register a user
            </button>
          </div>
          {this.getAlertResendResult()}
          { 
            this.state.usersList.length > 0 ? 
            <Table className="mt-4" striped> 
              <thead> 
                <tr> 
                  <th>Name</th> 
                  <th>Email</th>
                  <th>Is project manager</th> 
									<th>Position at work</th>
                  <th></th>
                </tr> 
              </thead> 
              <tbody> 
                {this.renderItems()}
              </tbody> 
            </Table> 
            : <div className="mt-3">There are no users</div>
          }
        </div>
        {this.state.modal ? (
          <UserModal
            activeItem={this.state.activeItem}
            allJobsList={this.state.allJobsList}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}
export default UserEditor;