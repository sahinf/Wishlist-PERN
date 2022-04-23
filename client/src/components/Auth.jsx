// https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap

import React, { useState } from "react"
import { Redirect } from 'react-router-dom';
import '../css/Auth.css';

export default function Auth(props) {
    let [authMode, setAuthMode] = useState("signin")
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    //* capture ID and Password
    let [id, setId] = useState("");
    let [password, setPassword] = useState("");

    //* Submit handler: should query db to see if id/pass exists
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { id, password };
            //* custom written API route below :)
            // const res = await fetch('http://127.0.0.1:8080/users', {
            //     method: "GET",
            //     headers: {"Content-type":"application/json"},
            // });

            //* update user password WORKS
            const url = `http://127.0.0.1:8080/users/${body.id}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(error.message)
        }
    }


    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={onSubmitForm}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>User ID</label>
                            <input
                                type="id"
                                className="form-control mt-1"
                                placeholder="Enter User ID"
                                onChange={e => setId(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={e => setPassword(e.target.value)}
                            // onChange={e => console.log(e.target)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }


    //** Register user (we can ignore this for now) */
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onSubmitForm}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}