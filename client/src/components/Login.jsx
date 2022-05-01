// https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap

import React from "react"
// import { Navlink } from 'react-router-dom';
import '../css/Login.css';
import { loginRequest } from "./RequestUser/RequestLogin";

import inputHook from './custom_hooks/formHook';

export default function Login(props) {

    //* capture ID and password
    let [input, setInput] = inputHook({
        users_id: "",
        user_password: ""
    })

    //* send ID and password to login API
    const handleSubmit = async (e) => {
        e.preventDefault(); //* Prevent a link (e) from opening the URL
        let jwt = await loginRequest(input);
        if (jwt) {
            localStorage.setItem("token", jwt);
            const { state } = props.location;
            window.location = state ? state.from.pathname : "/";
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    {/* If not registered, should reroute to sign up page */}
                    {/* <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div> */}
                    <div className="form-group mt-3">
                        <label>User ID</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter User ID"
                            name="users_id" // Database name
                            onChange={setInput}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            name="user_password" // Database name
                            onChange={setInput}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    {/* //! Remove forgot password */}
                    {/* <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                    
                    {/* Add <NavLink to="/signup"> Sign up </NavLink> */}
                </div>
            </form>
        </div>
    )
}