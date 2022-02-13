import React, { useState } from 'react';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';

const ProfileLayout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <>
            <div
                style={{ gridArea: "nav", backgroundColor: "#fff" }}
            >
            </div>
            <ProfileSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} openSidebar={openSidebar} />
            {props.children}
        </>
    )
}

export default ProfileLayout;