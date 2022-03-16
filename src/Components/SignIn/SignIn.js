import React from 'react';
import { useNavigate } from "react-router-dom";
import './SignInStyle.css';
import img from '../../Images/SignIn.png'

const SignIn = () => {

    let navigate = useNavigate();
    const handelSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    }

    return (
        <div className="signInContainer">
            <div className="form" >

                <h1>Book Readers</h1>

                <form onSubmit={handelSubmit}>
                    <div className="inputBox">
                        <input type="text" required="required" />
                        <span>User Name</span>
                    </div>

                    <div className="inputBox">
                        <input type="password" required="required" />
                        <span>Password</span>
                    </div>

                    <input type="submit" value="Sign In" />
                </form>
            </div>

            <div className="imgContainer">
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default SignIn;