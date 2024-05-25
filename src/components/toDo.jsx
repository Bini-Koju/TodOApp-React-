import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const ToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [describe, setDescribe] = useState("");
  const [toDoDate, setToDoDate] = useState("");
  const [priority, setPriority] = useState("moderate");

  return (
    <>
      <div className="w-100 px-3 mx-auto py-5">
        <div
          className="d-flex justify-content-center align-items-center gap-3
        "
        >
          <div className="d-flex flex-column w-75 gap-4">
            <Input
              placeholder="Enter your todo Task"
              value={toDo}
              onChange={(e) => {
                setToDo(e.target.value);
              }}
            />

            <div>
              <Input
                type="date"
                value={toDoDate}
                onChange={(e) => {
                  setToDoDate(e.target.value);
                }}
              />
            </div>

            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>
          <Input
            className="w-50 "
            style={{ height: "150px" }}
            type="textarea"
            placeholder="Enter the description"
            value={describe}
            onChange={(e) => {
              setDescribe(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              if (toDo && describe && toDoDate) {
                props.addOnList({
                  task: toDo,
                  description: describe,
                  date: toDoDate,
                  order: priority,
                });
                setToDo("");
                setDescribe("");
                setToDoDate("");
                setPriority("moderate");
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-danger">Task to be Done</h3>
        <hr className="w-25 mx-auto" />
      </div>

      <div
        className="d-flex justify-content-between align-items-center gap-4 mx-4  px-4
        my-3   "
      >
      <span className="w-25 fw-bold fontFam">Task</span>
      <span className="w-25 fw-bold fontFam">Description</span>
      <span className="w-25 fw-bold fontFam">Date</span>
      <span className="w-25 fw-bold fontFam">Order</span>
      <div className="d-flex justify-content-between gap-4">
        <span className="fw-bold fontFam">Edit</span>
        <span className="fw-bold fontFam">Delete</span>
      </div>
      </div>
    </>
  );
};

export default ToDo;
