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
      allProjectsList: this.props.allProjectsList,
      activeItem: this.props.activeItem
    };

    alert(JSON.stringify(this.state.activeItem));
  }

  handleChange = e => {
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  getValue = () => {
    let projId = this.state.activeItem.projectId;

    return projId ? this.state.allProjectsList.find(p => p.value === projId) : '';
  }

  onChange = (newValue) => {
    const activeItem = { ...this.state.activeItem, projectId: newValue.value };
    this.setState({ activeItem });
  }

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
                min={0.5} max={24}
                name="workTime"
                value={this.state.activeItem.worktime}
                onChange={this.handleChange}
                placeholder="Введите количество часов, потраченное на проект"
              />
            </FormGroup>
 
            <FormGroup>
              <Label for="projectId">Проект</Label>
              <Select 
                required
                onChange={this.onChange}
                value={this.getValue()}
                options={this.state.allProjectsList} 
                placeholder="Выберите проект"
              />
            </FormGroup>
 
            <FormGroup>
              <Label for="description">Комментарий</Label>
              <Input
                required
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
