import React from "react";
import './ProfileStyle.css';

const Profile = () => {
  return (
    <div className="page-container profile-container">
      <div className="information">
        <h2>Edit Information</h2>
        <div className="profile-img">
          <img
            src="https://images.unsplash.com/photo-1520078452277-0832598937e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="profile-img"
          />
        </div>
        <h3>Account Information</h3>
        <form>
          <div className="lable">
            <span>First Name</span>
            <input type="text" defaultValue="Muhammad" required />
          </div>
          <div className="lable">
            <span>Last Name</span>
            <input type="text" defaultValue="Muhammad" required />
          </div>
          <div className="lable">
            <span>E-mail</span>
            <input type="email" defaultValue="Muhammad@example.com" required />
          </div>
          <div className="lable">
            <span>Role</span>
            <input type="text" defaultValue="Editor" disabled={true} />
          </div>
          <input type="submit" />
        </form>
      </div>

    </div>
  );
};

export default Profile;
