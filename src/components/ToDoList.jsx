import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const ToDoList = ({ item, index, deleteFromList, editListItem, addOnList }) => {
  const [editedTask, setEditedTask] = useState(item.task);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedDate, setEditedDate] = useState(item.date);
  const [editedPriority, setEditedPriority] = useState(item.order);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    editListItem(index, {
      task: editedTask,
      description: editedDescription,
      date: editedDate,
      order: editedPriority,
    });
    setIsEditing(false);
  };

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center gap-4 mx-4  px-4
        my-3  border border-2 rounded-3 py-1 "
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
            <select
              value={editedPriority}
              onChange={(e) => {
                setEditedPriority(e.target.value);
              }}
            >
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
            <Button onClick={saveChanges}>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </>
        ) : (
          <>
          
          
            <span className="w-25 ">{item.task}</span>
            <span className="w-25 ">{item.description}</span>
            <span className="w-25 ">{item.date}</span>
            <span className="w-25 ">{item.order}</span>
            <div className="d-flex justify-content-between gap-4">
              <Button onClick={toggleEdit} size="sm" outline>
                <FontAwesomeIcon icon={faEdit} className="fs-12" />
              </Button>
              <Button
                onClick={() => deleteFromList(index)}
                color="danger"
                size="sm"
                outline
              >
                <FontAwesomeIcon icon={faTrash} className="fs-12" />
              </Button>
            </div>
            
          </>
        )}
      </div>
    </>
  );
};

export default ToDoList;
