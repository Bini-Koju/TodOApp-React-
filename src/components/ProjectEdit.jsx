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


const ProjectEdit = ({ modal, toggle, formik }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>EDIT PROJECT</ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label><h6>Project Name:</h6></Label>
            <Input
            invalid={formik.errors.editedProjectTask}
              name="editedProjectTask"
              value={formik.values.editedProjectTask}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.editedProjectTask && formik.errors.editedProjectTask ? (
              <div className="text-danger">{formik.errors.editedProjectTask}</div>
            ) : null}
          </FormGroup>
         
         
          <FormGroup>
            <Label><h6>Project Description:</h6></Label>
            <Input
            invalid={formik.errors.editedProjectDescription}
              style={{ height: "125px" }}
              type="textarea"
              name="editedProjectDescription"
              value={formik.values.editedProjectDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.editedProjectDescription &&
            formik.errors.editedProjectDescription ? (
              <div className="text-danger">
                {formik.errors.editedProjectDescription}
              </div>
            ) : null}
          </FormGroup>

          <FormGroup className="w-50">
              <Label><h6>Project Status:</h6></Label>
              <Input
                type="select"
                name="editedProjectStatus"
                value={formik.values.editedProjectStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </Input>
              {formik.touched.editedProjectStatus && formik.errors.editedProjectStatus ? (
                <div className="text-danger">{formik.errors.editedProjectStatus}</div>
              ) : null}
            </FormGroup>
          <ModalFooter>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ProjectEdit;

