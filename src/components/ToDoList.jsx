import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
  Input,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ToDoList = ({
  ListToDo,
  deleteFromList,
  editListItem,
  handleFilterChange,
  Filter,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("");

  const startEditing = (item, index) => {
    setEditIndex(index);
    setEditedTask(item.task);
    setEditedDescription(item.description);
    setEditedDate(item.date);
    setEditedPriority(item.order);
  };

  const saveChanges = (index) => {
    editListItem(index, {
      task: editedTask,
      description: editedDescription,
      date: editedDate,
      order: editedPriority,
    });
    setEditIndex(null);
  };

  const filteredList = ListToDo.filter((item) => {
    if (Filter === "all") {
      return true;
    } else {
      return Filter === item.order;
    }
  });

  return (
    <>
      <div className="d-flex gap-5 mx-2 px-5" style={{ minHeight: "630px" }}>
        <div className="w-100 px-5 shadow-lg bg-white rounded">
          <div className="py-4 mx-auto d-flex justify-content-center align-items-center">
            <h1 className="text-center fontFam">TODO LIST</h1>
          </div>
          <div className="w-100">
            <h6>FILTER BY PRIORITY</h6>
            <select
              className="text-muted"
              style={{ borderColor: "#ced4da" }}
              value={Filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>

            <Row className="my-4">
              {filteredList.length > 0 ? (
                filteredList.map((item, index) => (
                  <Col md="4" key={index} className="mb-4">
                    <Card
                      style={{ backgroundColor: "#F5E1FF", height: "230px" }}
                      className="shadow"
                    >
                      <CardBody>
                        {editIndex === index ? (
                          <>
                            <CardTitle tag="h5">
                              <label>Task:</label>
                              <Input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                              />
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                              <Input
                                type="text"
                                value={editedDescription}
                                onChange={(e) =>
                                  setEditedDescription(e.target.value)
                                }
                              />
                            </CardSubtitle>
                            <div className="d-flex gap-4">
                              <CardText>
                                <Input
                                  type="date"
                                  value={editedDate}
                                  onChange={(e) =>
                                    setEditedDate(e.target.value)
                                  }
                                />
                              </CardText>
                              <CardText>
                                <select
                                  style={{
                                    height: "36px",
                                    width: "130px",
                                    borderColor: "#ced4da",
                                  }}
                                  value={editedPriority}
                                  onChange={(e) =>
                                    setEditedPriority(e.target.value)
                                  }
                                >
                                  <option value="high">High</option>
                                  <option value="moderate">Moderate</option>
                                  <option value="low">Low</option>
                                </select>
                              </CardText>
                            </div>
                            <Button
                              onClick={() => saveChanges(index)}
                              color="primary"
                            >
                              <FontAwesomeIcon icon={faSave} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="mb-4">
                              <CardTitle className="mb-2" tag="h4">
                                Task: {item.task}
                              </CardTitle>
                              <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h5"
                              >
                                {item.description}
                              </CardSubtitle>
                              <CardText tag="h6">
                                Deadline: {item.date}
                              </CardText>
                              <CardText tag="h6">
                                Priority: {item.order}
                              </CardText>
                            </div>
                            <div className="d-flex justify-content-center gap-3">
                              <Button
                                onClick={() => startEditing(item, index)}
                                color="primary"
                                size="md"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                              <Button
                                onClick={() => deleteFromList(index)}
                                color="danger"
                                size="md"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="w-100 text-center my-5 py-5">
                  <h1 className="text-muted">No tasks in the list</h1>
                  <Link to="/">
                    <Button>Add </Button>
                  </Link>
                </div>
              )}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
