import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './SignInStyle.css';
import img from '../../Images/SignIn.png'
import { login } from '../../Store/AuthSlice';

const SignIn = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const from = location.state?.from?.pathname || "/";
    const { isLoggedIn, loading, errors } = useSelector((state) => state.auth);

    const handelLogin = e => {
        e.preventDefault();

        dispatch(login(
            {
                email,
                password
            }
        ));
    }

    useEffect(() => {
        if (isLoggedIn) {
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        }
    }, [isLoggedIn]);

    return (
        <div className="signInContainer">
            <div className="form" >

                <h1>Book Readers</h1>

                <form onSubmit={handelLogin}>
                    <div className="inputBox">
                        <input
                            type="text"
                            required="required"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>User Name</span>
                    </div>

                    <div className="inputBox">
                        <input
                            type="password"
                            required="required"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span>Password</span>
                    </div>

                    <div className="submit-button">
                        <input
                            className={loading ? "hide" : ""}
                            type="submit"
                            value="Sign In"
                        />
                        <div className="load-row">
                            <div className={loading && errors === null ? "load-block-anim" : "load-block"}></div>
                            <div className={loading && errors === null ? "load-block-anim" : "load-block"}></div>
                            <div className={loading && errors === null ? "load-block-anim" : "load-block"}></div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="imgContainer">
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default SignIn;