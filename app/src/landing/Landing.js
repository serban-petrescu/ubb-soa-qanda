import React from "react";
import logo from '../logo.svg';

import "./Landing.scss";

const Landing = () => (
    <div className="landing-page">
        <div className="call-to-action-outer">
            <div>
                <div className="call-to-action">
                    <img src={logo} alt="logo" className="logo" />
                    <h1>Q &amp; A</h1>
                    <h3><em><small>Where the questions are answered</small></em></h3>
                    <a href="#/register" className="button inverse">Register</a>
                </div>
            </div>
        </div>
        <a href="#/login" className="login-button button">Login</a>
    </div>
);

export default Landing;