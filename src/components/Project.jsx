import React from "react";
import { Button, FormGroup, Input, Form } from "reactstrap";
import ImgCarousel from "./Carousel";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
const initialValues = {
  projectName: "",
  projectDescribe: "",
  projectStatus: "PENDING",
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required("Required field"),
  projectDescribe: Yup.string().required("Required field"),
  projectStatus: Yup.string().required("Required field"),
});

const Project = (props) => {
  const Formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const toDoProject = {
        projectTask: values.projectName,
        projectDescription: values.projectDescribe,
        projectStage: values.projectStatus,
      };
      props.addProject(toDoProject);
      alert("Project is added");
      resetForm();
    },
  });

  return (
    <div>
      <div
        className="d-flex  flex-column flex-lg-row justify-content-center align-items-center py-2 mx-1 mx-lg-2 px-1 px-lg-5"
        style={{ minHeight: "630px" }}
      >
        <div className="w-md-50 w-xs-100 w-100 py-3 shadow-lg bg-white rounded">
          <div>
            <div className="text-center d-flex justify-content-between px-3 py-1">
              <h1 className="text-center  fontFam fw-lighter">PROJECT</h1>
              <Link to="/">
                <Button className="bg-white text-black border-0 fw-bold">
                  X
                </Button>
              </Link>
            </div>

            <Form className="w-100 px-3 py-2" onSubmit={Formik.handleSubmit}>
              {/* <div className="d-flex flex-column justify-content-start align-items-start gap-4"> */}
              <div className="d-flex flex-column w-100  gap-3">
                <FormGroup className="mb-0 mb-xl-2">
                  <label className="fw-bold">
                    <h5>Project Name:</h5>
                  </label>
                  <Input
                    id="projectName"
                    name="projectName"
                    type="text"
                    onBlur={Formik.handleBlur}
                    invalid={Formik.errors.projectName}
                    placeholder="Enter your project:"
                    onChange={Formik.handleChange}
                    value={Formik.values.projectName}
                  />
                  {Formik.errors.projectName && Formik.touched.projectName && (
                    <div className="text-danger">
                      {Formik.errors.projectName}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <label className="fw-bold">
                    <h5>Project Description:</h5>
                  </label>
                  <Input
                    id="projectDescribe"
                    name="projectDescribe"
                    style={{ height: "150px" }}
                    type="textarea"
                    onBlur={Formik.handleBlur}
                    invalid={Formik.errors.projectDescribe}
                    placeholder="Enter the description"
                    value={Formik.values.projectDescribe}
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors.projectDescribe &&
                    Formik.touched.projectDescribe && (
                      <div className="text-danger">
                        {Formik.errors.projectDescribe}
                      </div>
                    )}
                </FormGroup>

                <FormGroup className="w-md-50 w-100 d-flex flex-column">
                  <label className="fw-bold">
                    <h5>Project Status:</h5>
                  </label>
                  <Input
                    type="select"
                    name="projectStatus"
                    style={{ borderColor: "#ced4da", height: "38px" }}
                    value={Formik.values.projectStatus}
                    onChange={Formik.handleChange}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN-PROGRESS">IN-PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </Input>
                </FormGroup>
              </div>

              <div className="d-flex justify-content-center align-items-center  gap-2 gap-sm-3 mx-auto mb-2">
                <Button
                  type="submit"
                  className="bg-primary"
                  style={{ borderColor: "#ced4da" }}
                >
                  ADD PROJECT
                </Button>
                <Link to="/listProject">
                  <Button style={{ borderColor: "#ced4da" }}>
                    VIEW PROJECT
                  </Button>
                </Link>
              </div>
              {/* </div> */}
            </Form>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
        <div className="w-100 ">
          <ImgCarousel />
        </div>
      </div>
    </div>
  );
};

export default Project;
