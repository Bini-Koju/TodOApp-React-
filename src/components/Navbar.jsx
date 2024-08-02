import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

function Navbar() {
  return (
    <div className="d-flex justify-content-between px-4 py-2 ">
      <img
        style={{ width: "65px", height: "60px" }}
        src="https://icons.veryicon.com/png/o/miscellaneous/standard/task-32.png"
      />

      <Nav className="gap-1 d-flex flex-column flex-md-row justify-content-end align-items-end ">
        <NavItem>
          <NavLink href="/project" className="nav-link text-black fs-5">
            Add Project
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/listProject" className="nav-link text-black fs-5">
            View Project
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/add" className=" nav-link text-black fs-5">
            Add Task
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/list" className="nav-link text-black fs-5">
            View Task
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Navbar;
