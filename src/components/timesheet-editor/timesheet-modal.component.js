import React, { Component } from "react";
import Select from "react-select";
 
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


class DayModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProjectsList: this.props.allProjectsList,
      activeItem: this.props.activeItem
    };
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
         
          <Form onSubmit={() => onSave(this.state.activeItem)}>
            <FormGroup>
              <Label for="workTime">Количество часов, потраченное на проект</Label>
              <Input
                required
                type="number"
                step="0.5"
                min={0.5} max={24}
                name="workTime"
                value={this.state.activeItem.workTime}
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
                type="textarea"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Введите комментарий"
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
export default DayModal;
