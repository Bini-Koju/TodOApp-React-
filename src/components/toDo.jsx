import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";

const ToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [describe, setDescribe] = useState("");
  const [toDoDate, setToDoDate] = useState("");
  const [priority, setPriority] = useState("moderate");

  return (
    <>
    <div className="d-flex justify-content-between gap-5 mx-5 px-5 text-white " style={{ minHeight: "630px" }} >
    <div className="w-50">
      <div className="text-center py-4">
        <h1 className="text-center fontFam">TODO APP</h1>
      </div>
      <div className="w-100 px-3  py-2">
        <div className="d-flex flex-column justify-content-start align-items-start gap-4">
          <div className="d-flex flex-column w-100 gap-5">
            <div>
              <label className="fw-bold">
                <h5>Task:</h5>
              </label>
              <Input
              className="bg-success text-white " 
             
                placeholder="Enter your todo Task"
                value={toDo}
                onChange={(e) => {
                  setToDo(e.target.value);
                }}
              />
            </div>

            <div className="d-flex gap-4 mb-0">
              <div className="w-50">
                <label className="fw-bold">
                  <h5>Task Deadline:</h5>
                </label>
                <Input
                className="bg-success text-white "
                  type="date"
                  value={toDoDate}
                  onChange={(e) => {
                    setToDoDate(e.target.value);
                  }}
                />
              </div>

              <div className="w-50 d-flex flex-column">
                <label className="fw-bold">
                  <h5>Task Priority:</h5>
                </label>
                <select
                  className="p-1 pb-2 bg-success text-white  "
                  style={{ borderColor: "#ced4da" }}
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
            </div>

            <div>
              <label className="fw-bold">
                <h5>Task Description:</h5>
              </label>
              <Input
                className="w-100 bg-success text-white"
                style={{ height: "150px" }}
                type="textarea"
                placeholder="Enter the description"
                value={describe}
                onChange={(e) => {
                  setDescribe(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex gap-5 mx-auto">
            <Button
              className="px-4" style={{ borderColor: "#ced4da" }}
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
                  alert("Task is added");
                }
              }}
            >
              ADD TASK
            </Button>
            <Link to="/list">
              <Button className="px-4" style={{ borderColor: "#ced4da" }}>CHECK LIST</Button>
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div className="w-50" >
        <img src="../todo.png" alt="" style={{height:"550px"}}/>
      </div>
      </div>
    </>
  );
};

export default ToDo;
