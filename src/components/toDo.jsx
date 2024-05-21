import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const ToDo = (props) => {
    const[toDo, setToDo]=useState('')
    
  return (
    <>
    <div className="w-50 mx-auto my-5">  
      <div className="d-flex justify-content-center align-items-center gap-4">
        <Input placeholder="Enter your todo Task"
        value={toDo}
        onChange={e=>{
            setToDo(e.target.value)
        }} />
        <Button onClick={()=>{
            props.addOnList(toDo)
            setToDo('')
        }}>Add</Button>
      </div>
    </div>
    <div className="text-center">
        <h3>TODO</h3> 
        <hr className="w-25 mx-auto" />
    </div>
    </>
  );
};

export default ToDo;
