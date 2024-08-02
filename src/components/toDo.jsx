import React from "react";
import { Button, FormGroup, Input, Form } from "reactstrap";
import { Link } from "react-router-dom";
import ImgCarousel from "./Carousel";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  toDo: "",
  describe: "",
  toDoDate: "",
  priority: "MODERATE",
  status: "PENDING",
  project: "",
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const validationSchema = Yup.object().shape({
  toDo: Yup.string().required("Required field"),
  describe: Yup.string().required("Required field"),
  toDoDate: Yup.date().required("Required field"),
  priority: Yup.string().required("Required field"),
  status: Yup.string().required("Required field"),
  project: Yup.string().required("Required field"),
});

const ToDo = (props) => {
  const Formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const toDoItem = {
        task: values.toDo,
        description: values.describe,
        date: values.toDoDate,
        order: values.priority,
        stage: values.status,
        projectNum: values.project,
      };
      props.addList(toDoItem);
      alert("Task is added");
      resetForm();
    },
  });

  return (
    <div
      className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-2 mx-1 mx-lg-2 px-1 px-lg-5"
      style={{ minHeight: "630px" }}
    >
      <div className="w-100 ">
        <ImgCarousel />
      </div>
      <div className="w-md-50 w-xs-100 w-100 shadow-lg bg-light rounded">
        <div className="text-center d-flex justify-content-between px-3 py-1">
          <h1 className="text-center  fontFam fw-lighter">TASK</h1>
          <Link to="/">
            <Button className="bg-light text-black border-0 fw-bold">X</Button>
          </Link>
        </div>
        <Form className="w-100 px-3 py-2" onSubmit={Formik.handleSubmit}>
          <div className="d-flex flex-column justify-content-start align-items-start gap-4">
            <div className="d-flex flex-column w-100  gap-2">
              <FormGroup className="mb-0 mb-xl-2">
                <label className="fw-bold">
                  <h5>Task:</h5>
                </label>
                <Input
                  id="toDo"
                  name="toDo"
                  type="text"
                  onBlur={Formik.handleBlur}
                  invalid={Formik.errors.toDo}
                  placeholder="Enter your todo Task"
                  onChange={Formik.handleChange}
                  value={Formik.values.toDo}
                />
                {Formik.errors.toDo && Formik.touched.toDo && (
                  <div className="text-danger">{Formik.errors.toDo}</div>
                )}
              </FormGroup>

              <div className="d-flex flex-xl-row flex-column gap-0 gap-xl-2 mb-0">
                <FormGroup className=" w-50">
                  <label className="fw-bold">
                    <h5>Task Deadline:</h5>
                  </label>
                  <Input
                    id="toDoDate"
                    name="toDoDate"
                    type="date"
                    onBlur={Formik.handleBlur}
                    invalid={Formik.errors.toDoDate}
                    value={Formik.values.toDoDate}
                    min={getTodayDate()}
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors.toDoDate && Formik.touched.toDoDate && (
                    <div className="text-danger">{Formik.errors.toDoDate}</div>
                  )}
                </FormGroup>

                <FormGroup className="w-50">
                  <label>
                    <h5>Project</h5>
                  </label>
                  <Input
                    type="select"
                    name="project"
                    style={{ borderColor: "#ced4da", height: "38px" }}
                    value={Formik.values.project}
                    onChange={Formik.handleChange}
                  >
                    {/* <option value="PROJECT1">PROJECT1</option>
                    <option value="PROJECT2">PROJECT2</option>
                    <option value="PROJECT3">PROJECT3</option> */}
                    <option value="">Select a Project</option>
                    {props.ListProject.map((project, index) => (
                      <option key={index} value={project.projectTask}>
                        {project.projectTask}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </div>

              <div className="d-flex flex-xl-row flex-column gap-0 gap-xl-2 mb-0">
                <FormGroup className="w-md-50 w-100 d-flex flex-column">
                  <label className="fw-bold">
                    <h5>Task Priority:</h5>
                  </label>
                  <Input
                    type="select"
                    name="priority"
                    style={{ borderColor: "#ced4da", height: "38px" }}
                    value={Formik.values.priority}
                    onChange={Formik.handleChange}
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MODERATE">MODERATE</option>
                    <option value="LOW">LOW</option>
                  </Input>
                </FormGroup>

                <FormGroup className="w-md-50 w-100 d-flex flex-column">
                  <label className="fw-bold">
                    <h5>Task Status:</h5>
                  </label>
                  <Input
                    type="select"
                    name="status"
                    style={{ borderColor: "#ced4da", height: "38px" }}
                    value={Formik.values.status}
                    onChange={Formik.handleChange}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN-PROGRESS">IN-PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </Input>
                </FormGroup>
              </div>

              <FormGroup>
                <label className="fw-bold">
                  <h5>Task Description:</h5>
                </label>
                <Input
                  id="describe"
                  name="describe"
                  style={{ height: "150px" }}
                  type="textarea"
                  onBlur={Formik.handleBlur}
                  invalid={Formik.errors.describe}
                  placeholder="Enter the description"
                  value={Formik.values.describe}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.describe && Formik.touched.describe && (
                  <div className="text-danger">{Formik.errors.describe}</div>
                )}
              </FormGroup>
            </div>

            <div className="d-flex  gap-2 gap-sm-5 mx-auto mb-2">
              <Button
                type="submit"
                className="bg-primary"
                style={{ borderColor: "#ced4da" }}
              >
                ADD TASK
              </Button>
              <Link to="/list">
                <Button style={{ borderColor: "#ced4da" }}>VIEW TASK</Button>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ToDo;
