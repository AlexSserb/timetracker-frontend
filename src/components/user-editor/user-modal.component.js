import React, { Component } from "react";
import Select from "react-select";
 
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


class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allJobsList: this.props.allJobsList,
      activeItem: this.props.activeItem
    };
  }

  handleChangeLogin = login => {
    const item = this.state.activeItem;
    item.userAuth.login = login.target.value;
    this.setState({ activeItem: item });
  };

  handleChangeName = name => {
    const item = this.state.activeItem;
    item.userAuth.user.name = name.target.value;
    this.setState({ activeItem: item });
  }

  handleChangeIsManager = event => {
    const item = this.state.activeItem;
    item.userAuth.managerRole = event.target.checked;
    alert(JSON.stringify(item.userAuth.managerRole));
    this.setState({ activeItem: item });
  }

  getValue = () => {
    let jobId = this.state.activeItem.userAuth.user.job.id;

    return jobId ? this.state.allJobsList.find(j => j.value === jobId) : '';
  }

  onChangeJob = newValue => {
    const item = this.state.activeItem;
    const job = this.state.allJobsList.find(j => j.value === newValue.value);

    item.userAuth.user.job.id = job.value;
    item.userAuth.user.job.name = job.label;
    this.setState({ activeItem: item });
  }

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Пользователь </ModalHeader>
        <ModalBody>
         
          <Form>
            <FormGroup>
              <Label for="login">Почта</Label>
              <Input
                type="email"
                name="login"
                value={this.state.activeItem.userAuth.login}
                onChange={this.handleChangeLogin}
                placeholder="Введите почту"
              />
            </FormGroup>

						<FormGroup>
              <Label for="user.name">Имя</Label>
              <Input
                type="text"
                name="user.name"
                value={this.state.activeItem.userAuth.user.name}
                onChange={this.handleChangeName}
                placeholder="Введите имя"
              />
            </FormGroup>

						<FormGroup>
              <Input
								className="mx-2"
                type="checkbox"
                name="managerRole"
                checked={this.state.activeItem.userAuth.managerRole}
                onChange={this.handleChangeIsManager}
              />
							<Label for="managerRole">Является руководителем проектов</Label>
            </FormGroup>
 
            <FormGroup>
              <Label for="jobId">Должность</Label>
              <Select 
                onChange={this.onChangeJob}
                value={this.getValue()}
                options={this.state.allJobsList} 
                placeholder="Выберите должность"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default UserModal;
