import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './SidebarStyle.css';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
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
                        className="link"
                        activeClassName="active-menu-link"
                        to="/dashboard"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-home"></i>
                        Dashboard
                    </NavLink>
                </div>

                <h2>MNG</h2>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/books-management"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-book"></i>
                        Books Management
                    </NavLink>
                </div>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/authors-managment"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-pencil-square-o"></i>
                        Authors Managment
                    </NavLink>
                </div>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/reviews-managment"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-comments"></i>
                        Reviews Managment
                    </NavLink>
                </div>

                <h2>Suggestions & Problems</h2>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/suggestions"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-question"></i>
                        Suggestions
                    </NavLink>
                </div>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/problems"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-exclamation-circle"></i>
                        Problems
                    </NavLink>
                </div>

                <div className="sidebar-link">

                    <NavLink
                        className="link"
                        activeClassName="active-menu-link"
                        to="/feedback"
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-commenting"></i>
                        Feedback
                    </NavLink>
                </div>

                <div className="sidebar-logout">

                    <Link
                        className="link"
                        to="/logout "
                        onClick={() => closeSidebar()}
                    >
                        <i className="fa fa-sign-out"></i>
                        Log Out
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;
