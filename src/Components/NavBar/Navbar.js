import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, NavLink } from 'react-router-dom';
import './NavbarStyle.css';

function Navbar({ openSidebar }) {
    return (
        <nav className="navbar">
            <div className="nav-icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>

            <div className="navbar-left">
                <NavLink className={({ isActive }) => isActive ? "link active-link" : ""} to="/dashboard">Dashboard</NavLink>
                <NavLink className={({ isActive }) => isActive ? "link active-link" : ""} to="/books-management">Book Management</NavLink>
                <NavLink className={({ isActive }) => isActive ? "link active-link" : ""} to="/suggestions">Suggestions</NavLink>
            </div>

            <div className="navbar-right">
                <Link to="/user/information">
                    <Avatar>H</Avatar>
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;
