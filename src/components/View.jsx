import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

const ViewModal = ({ modal, toggle, item }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>View Task</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label className="mb-0">
            <h6>Task:</h6>
          </Label>
          <Input value={item.task} readOnly />
        </FormGroup>
        <FormGroup>
          <Label className="mb-0">
            <h6>Task Deadline:</h6>
          </Label>
          <Input value={item.date} readOnly />
        </FormGroup>
        <div className="d-flex justify-content-between gap-4">
          <FormGroup className="w-50 ">
            <Label className="mb-0">
              <h6>Task Priority:</h6>
            </Label>
            <Input value={item.order} readOnly></Input>
          </FormGroup>
          <FormGroup className="w-50">
            <Label className="mb-0">
              <h6>Task Status:</h6>
            </Label>
            <Input value={item.stage} readOnly></Input>
          </FormGroup>
          <FormGroup className="w-50">
            <Label className="mb-0">
              <h6>PROJECT:</h6>
            </Label>
            <Input value={item.projectNum} readOnly></Input>
          </FormGroup>
        </div>
        <FormGroup>
          <Label className="mb-0">
            <h6>Task Description:</h6>
          </Label>
          <Input
            type="textarea"
            style={{ height: "165px" }}
            value={item.description}
            readOnly
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewModal;
