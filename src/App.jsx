import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ToDo from "./components/toDo";
import ToDoList from "./components/ToDoList";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(list);
  }
  return [];
};

const App = () => {
  const [ListToDo, setListToDo] = useState(getLocalItems());

  const addList = (toDoItem) => {
    if (toDoItem.task && toDoItem.description && toDoItem.date) {
      let newList = [...ListToDo];
      let inserted = false;
      for (let i = 0; i < newList.length; i++) {
        if (new Date(toDoItem.date) < new Date(newList[i].date)) {
          newList.splice(i, 0, toDoItem);
          inserted = true;
          break;
        }
      }
      if (!inserted) {
        newList.push(toDoItem);
      }
      setListToDo(newList);
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(ListToDo));
  }, [ListToDo]);

  return (
    <>
      
      <Router>
        <div className="d-flex justify-content-center align-items-center container-fluid     ">
          <div className="my-2 mb-1 d-flex flex-column justify-content-center align-items-center px-1 w-100">
            <div className="w-100 ">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ToDo
                      ListToDo={ListToDo}
                      setListToDo={setListToDo}
                      addList={addList}
                    />
                  }
                />
                <Route
                  path="/list"
                  element={
                    <ToDoList ListToDo={ListToDo} setListToDo={setListToDo} />
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
