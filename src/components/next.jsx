import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import New from "./New";
import "./App.css";
import { Button } from "reactstrap";

const App = () => {
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

export default App;
