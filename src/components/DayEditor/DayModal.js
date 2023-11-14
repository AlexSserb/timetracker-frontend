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


class DayModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: this.props.activeItem,
      projectsList: this.props.allProjectsList
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
 
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Проект </ModalHeader>
        <ModalBody>
         
          <Form>
            <FormGroup>
              <Label for="workTime">Время, потраченное на проект</Label>
              <Input
                type="number"
                step="0.5"
                name="workTime"
                value={this.state.activeItem.worktime}
                onChange={this.handleChange}
                placeholder="Введите количество часов, потраченное на проект"
              />
            </FormGroup>
 
            <FormGroup>
              <Label for="projectId">Проект</Label>
              {/* <Select options={this.state.projectsList}/> */}
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
