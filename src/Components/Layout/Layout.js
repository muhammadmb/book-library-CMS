import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';

const Layout = (props) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            {props.children}
        </>
    )
}

export default Layout;