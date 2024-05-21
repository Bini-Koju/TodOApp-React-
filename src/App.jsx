import React, { useState } from "react";
import ToDo from "./components/toDo";
import ToDoList from "./components/ToDoList";

const App = () => {
  const [ListToDo, setListToDo] = useState([]);

  let addList = (toDo) => {
    if (toDo !== "") setListToDo([...ListToDo, toDo]);
  };

  const deleteItem = (key) => {
    let newList = [...ListToDo];
    newList.splice(key, 1);
    setListToDo([...newList]);
  };
  return (
    <>
      <div>
        <ToDo addOnList={addList} />
      </div>

      {ListToDo.map((listItem, i) => {
        return (
          <ToDoList key={i} index={i} item={listItem} deleteFromList={deleteItem} />
        );
      })}
    </>
  );
};

export default App;
