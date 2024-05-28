import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import "./App.css";
import { Button } from "reactstrap";

const Next = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center gap-5" id="main">
      <Router>
        <Routes>
          <Route path="/new" element={<New />} />
        </Routes>
        <Link to="/new">
          <Button color="primary">TO DO APP</Button>
        </Link>
      </Router>
    </div>
  );
};

export default Next;













<div>
        <div className="text-center">
          <h3 className="text-danger">Task to be Done</h3>
          <hr className="w-25 mx-auto" />
        </div>

        <div
          className="d-flex justify-content-between align-items-center gap-4 mx-4  px-4
        my-3   "
        >
          <span className="w-25 fw-bold fontFam">Task</span>
          <span className="w-25 fw-bold fontFam">Description</span>
          <span className="w-25 fw-bold fontFam">Date</span>
          <span className="w-25 fw-bold fontFam">Order</span>
          <div className="d-flex justify-content-between gap-4">
            <span className="fw-bold fontFam">Edit</span>
            <span className="fw-bold fontFam">Delete</span>
          </div>
        </div>
      </div>
