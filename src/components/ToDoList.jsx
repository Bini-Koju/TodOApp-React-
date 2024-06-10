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
import Example from "./Edit";
import ViewModal from "./View";
import ProjectView from "./ProjectView";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  editedTask: "",
  editedDescription: "",
  editedDate: "",
  editedPriority: "",
  editedStatus: "",
  editedProject: "",
};

const validationSchema = Yup.object().shape({
  editedTask: Yup.string().required("Required field"),
  editedDescription: Yup.string().required("Required field"),
  editedDate: Yup.date().required("Required field"),
  editedPriority: Yup.string().required("Required field"),
  editedStatus: Yup.string().required("Required field"),
  editedProject: Yup.string().required("Required field"),
});

const ToDoList = ({ ListToDo, setListToDo, ListProject }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [animationDone, setAnimationDone] = useState(false);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [itemToView, setItemToView] = useState(null);

  const [projectViewModalOpen, setProjectViewModalOpen] = useState(false);
  const [projectToView, setProjectToView] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      saveChanges(values);
    },
  });

  const deleteItem = (key) => {
    let newList = [...ListToDo];
    newList.splice(key, 1);
    setListToDo([...newList]);
  };

  const toggleModal = () => setModal(!modal);

  const editItem = (key, updatedItem) => {
    let newList = [...ListToDo];
    newList[key] = updatedItem;
    setListToDo(newList);
  };

  const startEditing = (item, filteredIndex) => {
    const originalIndex = ListToDo.findIndex(
      (task) =>
        task.task === item.task &&
        task.description === item.description &&
        task.date === item.date
    );
    setEditIndex(originalIndex);
    formik.setValues({
      editedTask: item.task,
      editedDescription: item.description,
      editedDate: item.date,
      editedPriority: item.order,
      editedStatus: item.stage,
      editedProject: item.projectNum,
    });
    toggleModal();
  };

  const saveChanges = (values) => {
    editItem(editIndex, {
      task: values.editedTask,
      description: values.editedDescription,
      date: values.editedDate,
      order: values.editedPriority,
      stage: values.editedStatus,
      projectNum: values.editedProject,
    });
    setEditIndex(null);
    toggleModal();
  };

  const handleFilterPriorityChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const handleFilterProjectChange = (e) => {
    setFilterProject(e.target.value);
  };

  const filteredList = ListToDo.filter((item) => {
    const priorityMatches =
      filterPriority === "all" || filterPriority === item.order;
    const statusMatches = filterStatus === "all" || filterStatus === item.stage;
    const projectMatches =
      filterProject === "all" || filterProject === item.projectNum;
    return priorityMatches && statusMatches && projectMatches;
  });

  useEffect(() => {
    setAnimationDone(true);
  }, []);

  const startViewing = (item, filteredIndex) => {
    setItemToView(item);
  };

  const toggleViewModal = () => {
    setViewModalOpen(!viewModalOpen);
  };

  const toggleProjectViewModal = () => {
    setProjectViewModalOpen(!projectViewModalOpen);
  };

  const startViewingProject = (projectNum) => {
    const project = ListProject.find((proj) => proj.projectTask === projectNum);
    if (project) {
      setProjectToView(project);
      toggleProjectViewModal();
    }
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
          <h1 className="text-center fontFam">TODO LIST</h1>
        </div>
        <div className="w-100">
          <div className="d-flex  flex-md-row flex-column justify-content-between ">
            <div className="d-flex flex-sm-row flex-column justify-content-end align-items-center gap-3 mb-5">
              <div>
                <h6>FILTER BY PRIORITY</h6>
                <select
                  className="text-muted"
                  style={{ borderColor: "#ced4da", width: "150px" }}
                  value={filterPriority}
                  onChange={handleFilterPriorityChange}
                >
                  <option value="all">All</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MODERATE">MODERATE</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

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

              <div>
                <h6>FILTER BY PROJECT</h6>
                <select
                  className="text-muted"
                  style={{ borderColor: "#ced4da", width: "150px" }}
                  value={filterProject}
                  onChange={handleFilterProjectChange}
                >
                  <option value="all">All</option>
                  {ListProject.map((project, index) => (
                    <option key={index} value={project.projectTask}>
                      {project.projectTask}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Row>
              <Col md={12} className="mt-3 d-flex gap-3">
                <Link to="/add">
                  <Button color="primary" className="px-3 py-1">
                    Add Task
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
                      <h5>Task</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Description</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Priority</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Status</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>PROJECT</h5>
                    </th>
                    <th className="fw-normal fs-3">
                      <h5>Deadline</h5>
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
                        <h6>{item.task}</h6>
                      </td>
                      <td className="text-capitalize ">
                        {" "}
                        {item.description.length > 10
                          ? `${item.description.slice(0, 10)}...`
                          : item.description}
                      </td>
                      <td className="text-capitalize">{item.order}</td>

                      <td className=" text-capitalize">
                        {/* <Badge color="primary">{item.stage}</Badge> */}

                        <Badge color={getColor(item.stage)}>{item.stage}</Badge>
                      </td>

                      <td
                        className=" text-capitalize"
                        onClick={() => startViewingProject(item.projectNum)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.projectNum}
                      </td>

                      <td>{item.date}</td>
                      <td className="icon-container ">
                        <FontAwesomeIcon
                          onClick={() => {
                            startViewing(item, index);
                            toggleViewModal();
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
                  No tasks in the list
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
          <Example modal={modal} toggle={toggleModal} formik={formik} ListProject={ListProject}  />
        )}

        {viewModalOpen && (
          <ViewModal
            modal={viewModalOpen}
            toggle={toggleViewModal}
            item={itemToView}
          />
        )}

        {projectViewModalOpen && (
          <ProjectView
            modal={projectViewModalOpen}
            toggle={toggleProjectViewModal}
            item={projectToView}
          />
        )}
      </div>
    </div>
  );
};

export default ToDoList;
