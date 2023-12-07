import React, { Component } from "react";
import { Table } from "reactstrap";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';

import userService from "../../services/user.service";
import UserModal from "./user-modal.component";
import jobsService from "../../services/job.service";


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
      allJobsList: []
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
  };
 
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.usersList.map((obj) => (
      <tr> 
        <td>{obj.userAuth.user.name}</td>
				<td>{obj.userAuth.login}</td>
        <td>{obj.userAuth.managerRole ? "Да" : "Нет"}</td> 
				<td>{obj.userAuth.user.job.name}</td>
        <td>
          <Button onClick={() => this.editItem(obj)}>
            <EditIcon/>
          </Button>
          <Button onClick={() => this.handleDelete(obj.userAuth)} >
            <DeleteIcon/>
          </Button>
          <Button>
            <EmailIcon/>
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
  };
 
  handleDelete = (item) => {
    userService.deleteUser(item.user)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
  
  // Create item
  createItem = () => {
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
  };
 
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Set list of all projects
  setJobsList = () => {
    jobsService.getAllJobs()
      .then(res => {
        let jobs = res.data.map(job => { return { value: job.id, label: job.name }});
        
        this.setState({ allJobsList: jobs });
      })
      .catch(err => console.log(err));
  };
 
  render() {
    return (
      <div>
        <h3 className="text-success text-uppercase text-center my-4">
          Пользователи
        </h3>
        <div className="col-md-6 col-sm-60 mx-auto p-0">        
          <div className="">
            <button onClick={this.createItem} className="btn btn-info m-2">
              Зарегистрировать пользователя
            </button>
          </div>
          { 
            this.state.usersList.length > 0 ? 
            <Table className="mt-4" striped> 
              <thead> 
                <tr> 
                  <th>Имя</th> 
                  <th>Логин</th>
                  <th>РП</th> 
									<th>Должность</th>
                  <th></th>
                </tr> 
              </thead> 
              <tbody> 
                {this.renderItems()}
              </tbody> 
            </Table> 
            : <div className="mt-3">Нет пользователей</div>
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