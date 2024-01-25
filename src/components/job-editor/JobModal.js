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
        <ModalHeader toggle={toggle}> Position at work </ModalHeader>
        <ModalBody>
         
          <Form onSubmit={() => onSave(this.state.activeItem)}>
            <FormGroup>
              <Label for="name">Name of position</Label>
              <Input
                required
                type="text"
                name="name"
                value={this.state.activeItem.job.name}
                onChange={this.handleChangeName}
                placeholder="Enter the name of position"
              />
            </FormGroup>
            <Button color="success">
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default JobModal;
