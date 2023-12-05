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

  handleChangeName = e => {
    const item = this.state.activeItem;
		item.job.name = e.target.value;
    this.setState({ activeItem: item });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Должность </ModalHeader>
        <ModalBody>
         
          <Form>
            <FormGroup>
              <Label for="name">Название должности</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.job.name}
                onChange={this.handleChangeName}
                placeholder="Введите название должности"
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
