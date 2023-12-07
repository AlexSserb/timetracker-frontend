import React, { Component } from "react";
 
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import projectService from "../../services/project.service";
import userService from "../../services/user.service";
import Select from "react-select";


class ProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curProjectId: this.props.curProjectId,
      isCreating: this.props.isCreating,
      allUsers: [],
      allSelectorUsers: [],
      selectedUsers: [],
      activeItem: { project: { name: "", id: "", active: true }, userList: [] },
      onSaveFunc: this.props.onSave
    };

    this.setUsersList();
    this.setActiveItem();
  }

  setActiveItem = () => {
    if (this.state.curProjectId === -1) {
      this.setState({ activeItem: { 
        project: { name: "", id: "", active: true }, userList: []
      }});
    }
    else {
      projectService.getProject(this.state.curProjectId)
        .then(res => {
          this.setState({ activeItem: { project: { name: res.data.name, id: res.data.id, active: true }, userList: [] }});
        })
      
      projectService.getUsersForProject(this.state.curProjectId)
        .then(res => {
          this.state.activeItem.userList = res.data;
          let selUsers = this.getSelectViewFromData(res.data);
          this.setState({ selectedUsers: selUsers });
        })
        .catch(err => console.log(err));
    }
  }

  // Set list of all users
	setUsersList = () => {
    userService.getAllUsers()
      .then(res => {
        // Delete current user for creating new project
        if (this.state.curProjectId === -1 && localStorage.getItem("user")) { 
          let userObj = JSON.parse(localStorage.getItem("user"));
          res.data = res.data.filter(user => user.id !== userObj.user);
        }

        let users = this.getSelectViewFromData(res.data);
        this.setState({ allUsers: res.data });
        this.state.allSelectorUsers = users;
      })
      .catch(err => console.log(err));
  };

  getSelectViewFromData = (data) => {
    return data.map(user => { return { value: user.id, label: user.job.name + " - " + user.name }});
  }

  handleChange = e => {
    this.setState({ activeItem: {
      project: {
        name: e.target.value,
        id: this.state.activeItem.project.id,
        active: true
      },
      userList: this.state.userList
    }});
  };

  onChangeUserList = (users) => {
		this.setState({ selectedUsers: users });
  }

  onSubmit = () => {
    let ulist = [];
    for (let i = 0; i < this.state.allUsers.length; i++) {
      let j = 0;
      while (j < this.state.selectedUsers.length && 
        this.state.selectedUsers[j].value !== this.state.allUsers[i].id) j++;
      if (j !== this.state.selectedUsers.length) {
        ulist.push(this.state.allUsers[i]);
      }
    }

    this.setState({ activeItem: {
      project: this.state.activeItem.project,
      userList: ulist
    }});

    this.state.activeItem.userList = ulist;
    this.state.onSaveFunc(this.state.activeItem);
  }
 
  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle  } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Проект </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="project.name">Название</Label>
              <Input
                required 
                type="text"
                name="project.name"
                value={this.state.activeItem.project.name}
                onChange={this.handleChange}
                placeholder="Введите название проекта"
              />
            </FormGroup>
            <FormGroup>
              <Label for="userList">Работники</Label>
							<Select 
                required
								onChange={this.onChangeUserList}
								value={this.state.selectedUsers}
								options={this.state.allSelectorUsers}
								isSearchable={true}
                placeholder="Выберите работников"
								isMulti
							/>
            </FormGroup>

            <Button color="success">
              Сохранить
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default ProjectModal;
