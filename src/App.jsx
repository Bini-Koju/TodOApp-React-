import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ToDo from "./components/toDo";
import ToDoList from "./components/ToDoList";
import Home from "./components/Home";

import Project from "./components/Project";
import ProjectList from "./components/ProjectList";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(list);
  }
  return [];
};

const getLocalProjects = () => {
  let project = localStorage.getItem("projects");
  console.log(project);

  if (project) {
    return JSON.parse(project);
  }
  return [];
};

const App = () => {
  const [ListToDo, setListToDo] = useState(getLocalItems());
  const [ListProject, setListProject] = useState(getLocalProjects());

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

  const addProject = (toDoProject) => {
    if (toDoProject.projectTask && toDoProject.projectDescription) {
      let newProject = [...ListProject];
      let inserted = false;

      if (!inserted) {
        newProject.push(toDoProject);
      }
      setListProject(newProject);
    }
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(ListToDo));
  }, [ListToDo]);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(ListProject));
  }, [ListProject]);

  return (
    <>
      <Router>
        <div className="d-flex justify-content-center align-items-center container-fluid     ">
          <div className="my-2 mb-1 d-flex flex-column justify-content-center align-items-center px-1 w-100">
            <div className="w-100 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/project"
                  element={
                    <Project
                      ListProject={ListProject}
                      setListProject={setListProject}
                      addProject={addProject}
                    />
                  }
                />
                <Route
                  path="/listProject"
                  element={
                    <ProjectList ListProject={ListProject} setListProject={setListProject} />
                  }
                />
                

                <Route
                  path="/add"
                  element={
                    <ToDo
                      ListToDo={ListToDo}
                      setListToDo={setListToDo}
                      addList={addList}
                      ListProject={ListProject}
                    />
                  }
                />
                <Route
                  path="/list"
                  element={
                    <ToDoList ListToDo={ListToDo} setListToDo={setListToDo} 
                    ListProject={ListProject}/>
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
