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

const ProjectView = ({ modal, toggle, item }) => {
    if (!item) {
        return null;
      }
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>VIEW PROJECT</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label className="mb-0">
            <h6>Project Name:</h6>
          </Label>
          <Input value={item.projectTask} readOnly />
        </FormGroup>
        
        
        <FormGroup>
          <Label className="mb-0">
            <h6>Project Description:</h6>
          </Label>
          <Input
            type="textarea"
            style={{ height: "165px" }}
            value={item.projectDescription}
            readOnly
          />
        </FormGroup>

        <FormGroup >
            <Label className="mb-0">
              <h6>Project Status:</h6>
            </Label>
            <Input value={item.projectStage} readOnly></Input>
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

export default ProjectView;
