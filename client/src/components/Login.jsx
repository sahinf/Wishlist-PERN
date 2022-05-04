// https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap

import React from "react"
import '../css/Login.css';
import { loginRequest } from "./RequestUser/RequestLogin";
import inputHook from './custom_hooks/formHook';
import { Outlet, useNavigate } from "react-router-dom";

export default function Login(props) {

    //* capture ID and password
    let [input, setInput] = inputHook({
        users_id: "",
        user_password: ""
    })

    props.DisplaySetNone();

    const navigate = useNavigate();
    //* send ID and password to login API
    const handleSubmit = async (e) => {
        e.preventDefault(); //* Prevent a link (e) from opening the URL
        let jwt = await loginRequest(input);
        //* Successful login!
        if (jwt) {
            localStorage.setItem("token", jwt);
            navigate('/')
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
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
                </div>
            </form>
            <Outlet />
        </div>
    )
}