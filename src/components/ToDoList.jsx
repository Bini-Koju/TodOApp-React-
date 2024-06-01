import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Example from "./Edit";

const ToDoList = ({ ListToDo, setListToDo }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modal, setModal] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const toggleModal = () => setModal(!modal);

  const deleteItem = (key) => {
    let newList = [...ListToDo];
    newList.splice(key, 1);
    setListToDo([...newList]);
  };

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
    setEditedTask(item.task);
    setEditedDescription(item.description);
    setEditedDate(item.date);
    setEditedPriority(item.order);
    setEditedStatus(item.stage);
    toggleModal();
  };

  const saveChanges = () => {
    editItem(editIndex, {
      task: editedTask,
      description: editedDescription,
      date: editedDate,
      order: editedPriority,
      stage: editedStatus,
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

  const filteredList = ListToDo.filter((item) => {
    const priorityMatches =
      filterPriority === "all" || filterPriority === item.order;
    const statusMatches = filterStatus === "all" || filterStatus === item.stage;
    return priorityMatches && statusMatches;
  });

  useEffect(() => {
    setAnimationDone(true);
  }, []);

  return (
    <div className="d-flex mx-2 px-5" style={{ minHeight: "630px" }}>
      <div className="w-100 px-5 shadow-lg bg-white rounded">
        <div className="py-4 mx-auto d-flex justify-content-center align-items-center">
          <h1 className="text-center fontFam">TODO LIST</h1>
        </div>
        <div className="w-100">
          <Row>
            <Col md={12} className="d-flex justify-content-end mb-4">
              <Link to="/">
                <Button color="primary" className="px-4">
                  Add Task
                </Button>
              </Link>
            </Col>
          </Row>
          <div className="d-flex justify-content-end  gap-3  mb-5">
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
          </div>
          <Row className="my-4">
            {filteredList.length > 0 ? (
              <Table
                striped
                className={`w-100 ${animationDone ? "table-animate" : ""}`}
              >
                <thead>
                  <tr>
                    <th className="fw-normal fs-5">Task</th>
                    <th className="fw-normal fs-5">Description</th>
                    <th className="fw-normal fs-5">Priority</th>
                    <th className="fw-normal fs-5">Status</th>
                    <th className="fw-normal fs-5">Deadline</th>
                    <th className="fw-normal fs-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item, index) => (
                    <tr key={index} className="table-hover">
                      <td className="text-capitalize ">{item.task}</td>
                      <td className="text-capitalize ">{item.description}</td>
                      <td className="text-capitalize " >{item.order}</td>
                      <td className="text-success text-capitalize">{item.stage}</td>
                      <td className="text-danger ">{item.date}</td>
                      <td className="icon-container ">
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
              <div className="w-100 text-center my-5 py-5">
                <h1 className="text-muted text-danger">No tasks in the list</h1>
                
              </div>
            )}
          </Row>
        </div>
        {editIndex !== null && (
          <Example
            modal={modal}
            toggle={toggleModal}
            editedTask={editedTask}
            setEditedDate={setEditedDate}
            setEditedDescription={setEditedDescription}
            setEditedPriority={setEditedPriority}
            setEditedStatus={setEditedStatus}
            setEditedTask={setEditedTask}
            editedDate={editedDate}
            editedDescription={editedDescription}
            editedPriority={editedPriority}
            editedStatus={editedStatus}
            saveChanges={saveChanges}
          />
        )}
      </div>
    </div>
  );
};

export default ToDoList;
