import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./SidebarStyle.css";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive sidebar" : "sidebar"}>
      <div className="sidebar-title">
        <h1>Book Readers</h1>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>

      <div className="sidebar-menu">
        <div className="sidebar-link">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-home"></i>
            Dashboard
          </NavLink>
        </div>

        <h2>Management</h2>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/books-management"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-book"></i>
            Books Management
          </NavLink>
        </div>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/authors-management"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-pencil-square-o"></i>
            Authors Managment
          </NavLink>
        </div>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/reviews-management"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-comments"></i>
            Reviews Management
          </NavLink>
        </div>

        <h2>Suggestions & Feedback</h2>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/suggestions"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-question"></i>
            Suggestions
          </NavLink>
        </div>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/feedback"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-commenting"></i>
            Feedback
          </NavLink>
        </div>

        <div className="sidebar-logout">
          <Link className="link" to="/logout " onClick={() => closeSidebar()}>
            <i className="fa fa-sign-out"></i>
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
