import React, { useState } from "react";
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
        newList.push(toDoItem); // If not inserted at any position, append at the end
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
      return Filter === item.order ;
    }
  });

  return (
    <>
      <div className=" d-flex  justify-content-center align-items-center w-100  " >
        <div className="my-5  d-flex flex-column justify-content-center align-items-center px-1 w-75 ">
          <div className="w-50">
            <h1 className="  text-center fontFam " >
              TODO APP
            </h1>
          </div>
          
          <div className=" w-75 border rounded-3 " id="main2">
            <div>
              <ToDo addOnList={addList} />
            </div>

            {filteredList.map((listItem, i) => (
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
        <div className="w-25 fixed-top m-5">
          <h6>FILTER BY PRIORITY</h6>
          <select value={Filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default App;
