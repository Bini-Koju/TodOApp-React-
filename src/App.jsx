import React, { useState } from "react";
import "./App.css"; 
import ToDo from "./components/toDo";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [ListToDo, setListToDo] = useState([]);

  const addList = (toDoItem) => {
    if (toDoItem.task && toDoItem.description && toDoItem.date) {
      setListToDo([...ListToDo, toDoItem]);
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

  return (
    <>
      <div className="container-fluid vh-100  d-flex flex-column justify-content-center align-items-start px-5" id="main">
        <div className="w-50">
        <h1 className="  text-center " id="fontFam">TODO APP</h1>
        {/* <hr className="border border-4 border-danger w-50 mx-auto mt-2" /> */}
        </div>
        <div className="bg-white w-50 border rounded-3  ">
          <div>
            <ToDo addOnList={addList} />
          </div>

          {ListToDo.map((listItem, i) => (
            <ToDoList
              key={i}
              index={i}
              item={listItem}
              deleteFromList={deleteItem}
              editListItem={editItem} // Pass editItem function
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
