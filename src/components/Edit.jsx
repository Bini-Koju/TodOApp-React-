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

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Example = ({ modal, toggle, formik, ListProject }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label><h6>Task:</h6></Label>
            <Input
            invalid={formik.errors.editedTask}
              name="editedTask"
              value={formik.values.editedTask}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.editedTask && formik.errors.editedTask ? (
              <div className="text-danger">{formik.errors.editedTask}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label><h6>Task Deadline:</h6></Label>
            <Input
            invalid={formik.errors.editedDate}
              type="date"
              name="editedDate"
              min={getTodayDate()}
              value={formik.values.editedDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.editedDate && formik.errors.editedDate ? (
              <div className="text-danger">{formik.errors.editedDate}</div>
            ) : null}
          </FormGroup>
          <div className="d-flex justify-content-between gap-4">
            <FormGroup className="w-50">
              <Label><h6>Task Priority:</h6></Label>
              <Input
                type="select"
                name="editedPriority"
                value={formik.values.editedPriority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="HIGH">HIGH</option>
                <option value="MODERATE">MODERATE</option>
                <option value="LOW">LOW</option>
              </Input>
              {formik.touched.editedPriority && formik.errors.editedPriority ? (
                <div className="text-danger">
                  {formik.errors.editedPriority}
                </div>
              ) : null}
            </FormGroup>
            <FormGroup className="w-50">
              <Label><h6>Task Status:</h6></Label>
              <Input
                type="select"
                name="editedStatus"
                value={formik.values.editedStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </Input>
              {formik.touched.editedStatus && formik.errors.editedStatus ? (
                <div className="text-danger">{formik.errors.editedStatus}</div>
              ) : null}
            </FormGroup>
            <FormGroup className="w-50">
              <Label><h6>PROJECT:</h6></Label>
              <Input
                type="select"
                name="editedProject"
                value={formik.values.editedProject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select a Project</option>
                    {ListProject.map((project, index) => (
                      <option key={index} value={project.projectTask}>
                        {project.projectTask}
                      </option>
                    ))}
              </Input>
              {formik.touched.editedProject && formik.errors.editedProject ? (
                <div className="text-danger">{formik.errors.editedProject}</div>
              ) : null}
            </FormGroup>
          </div>
          <FormGroup>
            <Label><h6>Description</h6></Label>
            <Input
            invalid={formik.errors.editedDescription}
              style={{ height: "125px" }}
              type="textarea"
              name="editedDescription"
              value={formik.values.editedDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.editedDescription &&
            formik.errors.editedDescription ? (
              <div className="text-danger">
                {formik.errors.editedDescription}
              </div>
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

export default Example;
