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
    const formattedTime = `${hours}.${minutes}`;
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
