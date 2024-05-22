import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

const ToDoList = ({ item, index, deleteFromList, editListItem }) => {
  const [editedTask, setEditedTask] = useState(item.task);
  const [editedDescription, setEditedDescription] = useState(item.description);
  const [editedDate, setEditedDate] = useState(item.date);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    editListItem(index, { task: editedTask, description:editedDescription, date: editedDate });
    setIsEditing(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center gap-4 mx-4  px-4
        my-3  border border-2 rounded-3 py-1 ">
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
            <Button onClick={saveChanges}>
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </>
        ) :
         (
          <>
            <span>{item.task}</span>
            <span>{item.description}</span>
            <span>{item.date}</span>
            <div className="d-flex justify-content-between gap-4">
              <Button onClick={toggleEdit}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button onClick={() => deleteFromList(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ToDoList;
