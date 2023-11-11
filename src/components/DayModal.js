import React, { Component } from "react";
 
// importing all of these classes from reactstrap module
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
 
// build a class base component
class DayModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  handleTimeChange = e => {
    const inputTime = e.target.value;
    const [hours, minutes] = inputTime.split(':');
    const formattedTime = `${hours}:${minutes}`;
    this.setState({ worktime: formattedTime })
  };
 
  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Проект </ModalHeader>
        <ModalBody>
         
          <Form>
 
            {/* 3 formgroups
            1 title label */}
            <FormGroup>
              <Label for="worktime">Время, потраченное на проект</Label>
              <Input
                type="time"
                step="1800"
                name="worktime"
                value={this.state.activeItem.worktime}
                onChange={this.handleChange}
                placeholder="Введите время, потраченное на проект"
              />
            </FormGroup>
 
            {/* 2 last name label */}
            <FormGroup>
              <Label for="projectId">Проект</Label>
              <Input
                type="text"
                name="projectId"
                value={this.state.activeItem.projectId}
                onChange={this.handleChange}
                placeholder="Введите id проекта"
              />
            </FormGroup>
 
            {/* 3 patronymic label */}
            <FormGroup>
              <Label for="description">Комментарий</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Введите комментарий"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default DayModal;