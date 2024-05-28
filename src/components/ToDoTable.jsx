import React from "react";
import { Table } from "reactstrap";
import ToDoList from "./ToDoList"; // Make sure to import ToDoList

const ToDoTable = ({ items, deleteFromList, editListItem }) => {
  return (
    <Table bordered hover className="my-3">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Date</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ToDoList
            key={index}
            item={item}
            index={index}
            deleteFromList={deleteFromList}
            editListItem={editListItem}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ToDoTable;
