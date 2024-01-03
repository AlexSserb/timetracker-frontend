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


class JobModal extends Component {
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
         
          <Form onSubmit={() => onSave(this.state.activeItem)}>
            <FormGroup>
              <Label for="name">Название должности</Label>
              <Input
                required
                type="text"
                name="name"
                value={this.state.activeItem.job.name}
                onChange={this.handleChangeName}
                placeholder="Введите название должности"
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
export default JobModal;
