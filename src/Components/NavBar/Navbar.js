import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, NavLink } from 'react-router-dom';
import './NavbarStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../Store/ProfileSlice';

function Navbar({ openSidebar }) {

    const { profile } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

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
                    <Avatar src={profile.pictureUrl} />
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;
