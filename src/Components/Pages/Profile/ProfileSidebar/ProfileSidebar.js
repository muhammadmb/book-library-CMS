import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../../Store/AuthSlice';
import './ProfileSidebarStyle.css';

const ProfileSidebar = ({ sidebarOpen, closeSidebar, openSidebar }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelLogout = () => {
        dispatch(logout());
        closeSidebar();
        navigate("/sign-in");
    }

    return (
        <div className={!sidebarOpen ? 'closed sidebar-pr' : "sidebar-pr"}>
            <i
                className={
                    sidebarOpen ?
                        "fa fa-arrow-left close-icon"
                        :
                        "fa fa-arrow-left close-icon open-icon"
                }
                aria-hidden="true"
                onClick={() => { sidebarOpen ? closeSidebar() : openSidebar() }}
            ></i>

            <div className='sidebar-link-pr'>
                <NavLink
                    className="link"
                    to="/"
                >
                    <i className="fa fa-home"></i> Dashboard
                </NavLink>
            </div>

            <div className='sidebar-link-pr'>
                <NavLink
                    className="link"
                    activeClassName="active-side-link"
                    to="/user/information"
                    onClick={() => closeSidebar()}
                >
                    <i className="fa fa-info-circle"></i> Information
                </NavLink>
            </div>

            <div className='sidebar-link-pr'>
                <NavLink
                    className="link"
                    activeClassName="active-side-link"
                    to="/user/my-team"
                    onClick={() => closeSidebar()}
                >
                    <i className="fa fa-user" aria-hidden="true"></i> My Team
                </NavLink>
            </div>

            <div className='sidebar-link-pr'>
                <NavLink
                    className="link"
                    activeClassName="active-side-link"
                    to="/user/history"
                    onClick={() => closeSidebar()}
                >
                    <i className="fa fa-history" aria-hidden="true"></i> History
                </NavLink>
            </div>

            <div className='sidebar-link-pr'>
                <span
                    className="link"
                    to="/sign-in"
                    onClick={handelLogout}
                >
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
                </span>
            </div>
        </div>
    )
}

export default ProfileSidebar;