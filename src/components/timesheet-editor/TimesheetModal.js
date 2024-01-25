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
        <ModalHeader toggle={toggle}> Project </ModalHeader>
        <ModalBody>
         
          <Form onSubmit={() => onSave(this.state.activeItem)}>
            <FormGroup>
              <Label for="workTime">The number of hours spent on the project</Label>
              <Input
                required
                type="number"
                step="0.5"
                min={0.5} max={24}
                name="workTime"
                value={this.state.activeItem.workTime}
                onChange={this.handleChange}
                placeholder="Enter the number of hours spent on the project"
              />
            </FormGroup>
 
            <FormGroup>
              <Label for="projectId">Project</Label>
              <Select 
                required
                onChange={this.onChange}
                value={this.getValue()}
                options={this.state.allProjectsList} 
                placeholder="Select a project"
              />
            </FormGroup>
 
            <FormGroup>
              <Label for="description">Comment</Label>
              <Input
                type="textarea"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter a comment"
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
export default DayModal;
