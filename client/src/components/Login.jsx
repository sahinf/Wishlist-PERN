// https://supertokens.com/blog/building-a-login-screen-with-react-and-bootstrap

import React from "react"
import { Navlink } from 'react-router-dom';
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
        e.preventDefault();
        console.log('Handling submit')
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
                            type="id"
                            className="form-control mt-1"
                            placeholder="Enter User ID"
                            //! Should update id
                            // onChange={e => console.log(e.target.value)}
                            onChange={e => console.log('lol')}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            // ! update password 
                            onChange={e => console.log(e.target.value)}
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


    //** Register user (we can ignore this for now) */
    // return (
    //     <div className="Auth-form-container">
    //         <form className="Auth-form" onSubmit={onSubmitForm}>
    //             <div className="Auth-form-content">
    //                 <h3 className="Auth-form-title">Sign In</h3>
    //                 <div className="text-center">
    //                     Already registered?{" "}
    //                     <span className="link-primary" onClick={changeAuthMode}>
    //                         Sign In
    //                     </span>
    //                 </div>
    //                 <div className="form-group mt-3">
    //                     <label>Full Name</label>
    //                     <input
    //                         type="email"
    //                         className="form-control mt-1"
    //                         placeholder="e.g Jane Doe"
    //                     />
    //                 </div>
    //                 <div className="form-group mt-3">
    //                     <label>Email address</label>
    //                     <input
    //                         type="email"
    //                         className="form-control mt-1"
    //                         placeholder="Email Address"
    //                     />
    //                 </div>
    //                 <div className="form-group mt-3">
    //                     <label>Password</label>
    //                     <input
    //                         type="password"
    //                         className="form-control mt-1"
    //                         placeholder="Password"
    //                     />
    //                 </div>
    //                 <div className="d-grid gap-2 mt-3">
    //                     <button type="submit" className="btn btn-primary">
    //                         Submit
    //                     </button>
    //                 </div>
    //                 <p className="text-center mt-2">
    //                     Forgot <a href="#">password?</a>
    //                 </p>
    //             </div>
    //         </form>
    //     </div>
    // )
}