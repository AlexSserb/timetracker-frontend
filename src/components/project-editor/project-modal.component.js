import React, { Component } from "react";
 
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
      allUsers: [],
      allSelectorUsers: [],
      selectedUsers: [],
      activeItem: { project: { name: "", id: "" }, userList: [] },
      onSaveFunc: this.props.onSave
    };

    this.setUsersList();
    this.setActiveItem();
  }

  setActiveItem = () => {
    if (this.state.curProjectId === -1) {
      this.setState({ activeItem: { 
        project: { name: "", id: "" }, userList: []
      }});
    }
    else {
      projectService.getProject(this.state.curProjectId)
        .then(res => {
          this.setState({ activeItem: { project: { name: res.data.name, id: res.data.id }, userList: [] }});
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
        let users = this.getSelectViewFromData(res.data);
        this.setState({ allUsers: res.data });
        this.state.allSelectorUsers = users;
        if (users.length > 0) {
          this.setState({ selectedUser: users[0].value });
        }
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
        id: this.state.activeItem.project.id
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
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Проект </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="project.name">Название</Label>
              <Input
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
								onChange={this.onChangeUserList}
								value={this.state.selectedUsers}
								options={this.state.allSelectorUsers}
								isSearchable={true}
								isMulti
							/>
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Button color="success" onClick={this.onSubmit}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default ProjectModal;
