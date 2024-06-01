import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from "reactstrap";

const Example = ({
  modal,
  toggle,
  editedTask,
  setEditedTask,
  editedDescription,
  setEditedDescription,
  editedDate,
  setEditedDate,
  editedPriority,
  setEditedPriority,
  editedStatus,
  setEditedStatus,
  saveChanges
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Task:</Label>
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Task Deadline:</Label>
          <Input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Task Priority:</Label>
          <Input
            type="select"
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="HIGH">HIGH</option>
            <option value="MODERATE">MODERATE</option>
            <option value="LOW">LOW</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Task Status:</Label>
          <Input
            type="select"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="IN-PROGRESS">IN-PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Task Description:</Label>
          <Input
            type="textarea"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={saveChanges}>Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default Example;
