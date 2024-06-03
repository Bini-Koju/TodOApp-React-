import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import ImgCarousel from "./Carousel";

const ToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [describe, setDescribe] = useState("");
  const [toDoDate, setToDoDate] = useState("");
  const [priority, setPriority] = useState("MODERATE");
  const [status, setStatus] = useState("PENDING");

  // Function to get today's date in the format YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-2 mx-2 px-5" style={{ minHeight: "630px" }}>
        <div className="w-50">
          <ImgCarousel style={{ height: "560px", width: "600px" }} />
        </div>
        <div className="w-50 shadow-lg bg-white rounded">
          <div className="text-center py-1">
            <h1 className="text-center fontFam">TODO APP</h1>
          </div>
          <div className="w-100 px-3 py-2">
            <div className="d-flex flex-column justify-content-start align-items-start gap-4">
              <div className="d-flex flex-column w-100 gap-5">
                <div>
                  <label className="fw-bold">
                    <h5>Task:</h5>
                  </label>
                  <Input
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
                      type="date"
                      value={toDoDate}
                      min={getTodayDate()}
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
                      style={{ borderColor: "#ced4da", height: "38px" }}
                      value={priority}
                      onChange={(e) => {
                        setPriority(e.target.value);
                      }}
                    >
                      <option value="HIGH">HIGH</option>
                      <option value="MODERATE">MODERATE</option>
                      <option value="LOW">LOW</option>
                    </select>
                  </div>

                  <div className="w-50 d-flex flex-column">
                    <label className="fw-bold">
                      <h5>Task Status:</h5>
                    </label>
                    <select
                      style={{ borderColor: "#ced4da", height: "38px" }}
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN-PROGRESS">IN-PROGRESS</option>
                      {/* <option value="COMPLETED" >COMPLETED</option> */}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="fw-bold">
                    <h5>Task Description:</h5>
                  </label>
                  <Input
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
                  className="bg-primary"
                  style={{ borderColor: "#ced4da" }}
                  onClick={() => {
                    if (toDo && describe && toDoDate) {
                      props.addList({
                        task: toDo,
                        description: describe,
                        date: toDoDate,
                        order: priority,
                        stage: status,
                      });
                      setToDo("");
                      setDescribe("");
                      setToDoDate("");
                      setPriority("MODERATE");
                      setStatus("PENDING");
                      alert("Task is added");
                    }
                  }}
                >
                  ADD TASK
                </Button>
                <Link to="/list">
                  <Button style={{ borderColor: "#ced4da" }}>CHECK LIST</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
