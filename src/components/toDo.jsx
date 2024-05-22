import React, { useState } from "react";
import { Button, Input } from "reactstrap";


const ToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [describe, setDescribe] = useState("");
  const [toDoDate, setToDoDate] = useState("");

  return (
    <>
      <div className="w-100 px-4 mx-auto py-5">

        <div className="d-flex justify-content-center align-items-center gap-2">
          <Input
            placeholder="Enter your todo Task"
            value={toDo}
            onChange={(e) => {
              setToDo(e.target.value);
            }}
          />
         <Input
            placeholder="Enter the description"
            value={describe}
            onChange={(e) => {
              setDescribe(e.target.value);
            }}
          />
          <div>
            <Input type="date"
            value={toDoDate}
            onChange={(e) => {
              setToDoDate(e.target.value);
            }}
             />
          </div>
          <Button
            onClick={() => {
              if(toDo && describe && toDoDate){
              props.addOnList({task:toDo, description:describe, date:toDoDate});
              setToDo("");
              setDescribe("");
              setToDoDate("");
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
    </>
  );
};

export default ToDo;
