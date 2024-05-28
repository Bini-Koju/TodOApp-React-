import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";


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

  return (
    <>
      <div className="d-flex gap-5 mx-5 px-5 text-white " style={{ minHeight: "630px" }} >
       
        <div className="w-75">
          <div className="text-center py-4">
            <h1 className="text-center fontFam">TODO LIST</h1>
          </div>
          <div className="w-100  ">
            <h6>FILTER BY PRIORITY</h6>
            <select
            className="bg-success text-white"
            style={{ borderColor: "#ced4da" }} 
             value={Filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>

            <Table bordered hover className="my-4 " style={{ borderColor: "#ced4da" }}>
              <thead>
                <tr className="text-center text-white ">
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center text-white">
                {ListToDo.map((item, index) => (
                  
                  <tr key={index}>
                    {editIndex === index ? (
                      <>
                        <td>{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={editedDate}
                            onChange={(e) => setEditedDate(e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            value={editedPriority}
                            onChange={(e) => setEditedPriority(e.target.value)}
                          >
                            <option value="high">High</option>
                            <option value="moderate">Moderate</option>
                            <option value="low">Low</option>
                          </select>
                        </td>
                        <td>
                          <Button
                            onClick={() => saveChanges(index)}
                            color="success"
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{index + 1}</td>
                        <td>{item.task}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td>
                        <td>{item.order}</td>
                        <td className="d-flex justify-content-center align-items-center gap-4">
                          <Button
                            onClick={() => startEditing(item, index)}
                            color="primary"
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{" "}
                          <Button
                            onClick={() => deleteFromList(index)}
                            color="danger"
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="w-50">
          <img
            src="../deadline.png"
            alt="no img"
            style={{width:"100%", height:"550px"}}
          />
        </div>
      </div>
    </>
  );
};

export default ToDoList;
