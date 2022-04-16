import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Store/AuthSlice";
import "./SidebarStyle.css";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(logout());
    closeSidebar();
    navigate("/sign-in");
  }

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
            to="/books-management/1"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-book"></i>
            Books Management
          </NavLink>
        </div>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/authors-management/1"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-pencil-square-o"></i>
            Authors Managment
          </NavLink>
        </div>

        <div className="sidebar-link">
          <NavLink
            className={({ isActive }) => isActive ? "link active-menu-link" : "link"}
            to="/genres-management/1"
            onClick={() => closeSidebar()}
          >
            <i className="fa fa-list-ul"></i>
            Genres Management
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
          <span
            className="link"
            to="/logout"
            onClick={handelLogout}>
            <i className="fa fa-sign-out"></i>
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
