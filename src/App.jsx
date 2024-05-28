import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ToDo from "./components/toDo";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [ListToDo, setListToDo] = useState([]);
  const [Filter, setFilter] = useState("all");

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

  const deleteItem = (key) => {
    let newList = [...ListToDo];
    newList.splice(key, 1);
    setListToDo([...newList]);
  };

  const editItem = (key, updatedItem) => {
    let newList = [...ListToDo];
    newList[key] = updatedItem;
    setListToDo(newList);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredList = ListToDo.filter((item) => {
    if (Filter === "all") {
      return true;
    } else {
      return Filter === item.order;
    }
  });

  return (
    <Router>
      <div className="d-flex justify-content-center align-items-center w-100 bg-success text-white">
        <div className="my-2 mb-1 d-flex flex-column justify-content-center align-items-center px-1 w-100">
          

          <div className="w-100 " >
            <Routes>
              <Route
                path="/"
                element={<ToDo addOnList={addList} />}
              />
              <Route
                path="/list"
                element={
                  <ToDoList
                    ListToDo={filteredList}
                    deleteFromList={deleteItem}
                    editListItem={editItem}
                    handleFilterChange={handleFilterChange}
                    Filter={Filter}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
