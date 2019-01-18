import React from "react";
import PropTypes from "prop-types";

const Login = ({ username, password, error, onChangeUsername, onChangePassword, onSubmit }) => (
    <div className="container">
        <form className="login-form">
            <fieldset>
                <legend>Login</legend>

                <div className="row responsive-label">
                    <div className="col-sm-12 col-md-3"><label>Username</label></div>
                    <div className="col-sm-12 col-md">
                        <input type="text" placeholder="Username" value={username} style={{ width: "85%" }}
                            onChange={e => onChangeUsername(e.target.value)} />
                    </div>
                </div>

                <div className="row responsive-label">
                    <div className="col-sm-12 col-md-3"><label>Password</label></div>
                    <div className="col-sm-12 col-md">
                        <input type="password" placeholder="Password" value={password} style={{ width: "85%" }}
                            onChange={e => onChangePassword(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md col-md-offset-3">
                    {
                        error ? <p><mark className="secondary">Invalid username or password.</mark></p> : <span />
                    }
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md col-md-offset-3">
                        <button className="button primary" onClick={e => { onSubmit(); e.preventDefault(); }} style={{minWidth: "13em"}}> 
                            Login
                        </button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
);

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.bool,
    onChangeUsername: PropTypes.func,
    onChangePassword: PropTypes.func,
    onSubmit: PropTypes.func,
}


export default Login;