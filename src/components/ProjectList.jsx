import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faEye,
  faPlus,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProjectEdit from "./ProjectEdit";
import ProjectView from "./ProjectView";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  editedProjectTask: "",
  editedProjectDescription: "",
  editedProjectStage: "",
};

const validationSchema = Yup.object().shape({
  editedProjectTask: Yup.string().required("Required field"),
  editedProjectDescription: Yup.string().required("Required field"),
  editedProjectStatus: Yup.string().required("Required field"),
});

const ProjectList = ({ ListProject, setListProject }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [animationDone, setAnimationDone] = useState(false);
  const [ProjectViewOpen, setProjectViewOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      saveChanges(values);
    },
  });

  const deleteItem = (key) => {
    let newListProject = [...ListProject];
    newListProject.splice(key, 1);
    setListProject([...newListProject]);
  };

  const toggleModal = () => setModal(!modal);

  const editItem = (key, updatedItem) => {
    let newListProject = [...ListProject];
    newListProject[key] = updatedItem;
    setListProject(newListProject);
  };

  const startEditing = (item, filteredIndex) => {
    const originalIndex = ListProject.findIndex(
      (task) =>
        task.projectTask === item.projectTask &&
        task.projectDescription === item.projectDescription
    );
    setEditIndex(originalIndex);
    formik.setValues({
      editedProjectTask: item.projectTask,
      editedProjectDescription: item.projectDescription,
      editedStatus: item.projectStage,
    });
    toggleModal();
  };

  const saveChanges = (values) => {
    editItem(editIndex, {
      projectTask: values.editedProjectTask,
      projectDescription: values.editedProjectDescription,
      projectStage: values.editedProjectStatus,
    });
    setEditIndex(null);
    toggleModal();
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredList = ListProject.filter((item) => {
    const statusMatches =
      filterStatus === "all" || filterStatus === item.projectStage;

    return statusMatches;
  });

  useEffect(() => {
    setAnimationDone(true);
  }, []);

  const startViewing = (item, filteredIndex) => {
    setItemToView(item);
  };

  const toggleProjectView = () => {
    setProjectViewOpen(!ProjectViewOpen);
  };

  const getColor = (status) => {
    if (status === "PENDING") return "primary";
    if (status === "COMPLETED") return "success";
    return "danger";
  };

  return (
    <div
      className="d-flex mx-0 mx-md-2 px-1 px-lg-5 px-md-3"
      style={{ minHeight: "630px" }}
    >
      <div className="w-100 px-2 px-md-5 shadow-lg bg-white rounded">
        <div className="py-4 mx-auto d-flex justify-content-center align-items-center">
          <h1 className="text-center fontFam">PROJECT LIST</h1>
        </div>
        <div className="w-100">
          <div className="d-flex  flex-md-row flex-column justify-content-between ">
            <div>
              <h6>FILTER BY STATUS</h6>
              <select
                className="text-muted"
                style={{ borderColor: "#ced4da", width: "150px" }}
                value={filterStatus}
                onChange={handleFilterStatusChange}
              >
                <option value="all">All</option>
                <option value="PENDING">PENDING</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <Row>
              <Col md={12} className="mt-3 d-flex justify-content-between gap-3">
                <Link to="/project">
                  <Button color="primary" className="px-3 py-1">
                    Add PROJECT
                    <FontAwesomeIcon
                      className="text-white mx-1"
                      icon={faPlus}
                    />
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="px-3 py-1 ">
                    Home
                    <FontAwesomeIcon
                      className="text-white mx-1 "
                      icon={faHome}
                      />
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
          <Row className="my-3 mx-1">
            {filteredList.length > 0 ? (
              <Table
                responsive
                striped
                className={`w-100 ${animationDone ? "table-animate" : ""}`}
              >
                <thead>
                  <tr>
                    <th className="fw-normal fs-3">
                      <h5>S.N</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Project Name</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Project Description</h5>
                    </th>

                    <th className="fw-normal fs-3">
                      <h5>Project Status</h5>
                    </th>

                    <th className="fw-normal fs-3">
                      <h5>Actions</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item, index) => (
                    <tr key={index} className="table-hover">
                      <td>{index + 1}</td>
                      <td className="text-capitalize">
                        <h6>{item.projectTask}</h6>
                      </td>
                      <td className="text-capitalize ">
                        {" "}
                        {item.projectDescription.length > 10
                          ? `${item.projectDescription.slice(0, 10)}...`
                          : item.projectDescription}
                      </td>

                      <td className=" text-capitalize">
                        <Badge color={getColor(item.projectStage)}>
                          {item.projectStage}
                        </Badge>
                      </td>

                      <td className="icon-container ">
                        <FontAwesomeIcon
                          onClick={() => {
                            startViewing(item, index);
                            toggleProjectView();
                          }}
                          style={{ color: "green", cursor: "pointer" }}
                          icon={faEye}
                          className="mx-2"
                        />
                        <FontAwesomeIcon
                          onClick={() => startEditing(item, index)}
                          style={{ color: "blue", cursor: "pointer" }}
                          icon={faEdit}
                          className="mx-2"
                        />
                        <FontAwesomeIcon
                          onClick={() => deleteItem(index)}
                          style={{ color: "red", cursor: "pointer" }}
                          icon={faTrash}
                          className="mx-2"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="w-100 text-center my-2 py-5">
                <h1 className="text-muted text-danger mb-2">
                  No projects in the list
                </h1>
                <img
                  className="w-100%"
                  src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif"
                  alt="noImage"
                />
              </div>
            )}
          </Row>
        </div>

        {editIndex !== null && (
          <ProjectEdit modal={modal} toggle={toggleModal} formik={formik} />
        )}

        {ProjectViewOpen && (
          <ProjectView
            modal={ProjectViewOpen}
            toggle={toggleProjectView}
            item={itemToView}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectList;
