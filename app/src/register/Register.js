import React from "react";
import PropTypes from "prop-types";

const Register = ({ username, password, repeat, error, success, onChangeUsername, onChangePassword, onChangeRepeat, onSubmit }) => (
    <div className="container">
        {
            success ?
                <p>
                    <mark className="tertiary">
                        You were successfully registered! Please check your email to activate your account.
                    </mark>
                </p> :
                <form>
                    <fieldset>
                        <legend>Register</legend>

                        <div className="row responsive-label">
                            <div className="col-sm-12 col-md-3"><label>Email</label></div>
                            <div className="col-sm-12 col-md">
                                <input type="text" placeholder="Email" value={username}
                                    style={{ width: "85%" }} onChange={e => onChangeUsername(e.target.value)} />
                            </div>
                        </div>

                        <div className="row responsive-label">
                            <div className="col-sm-12 col-md-3"><label>Password</label></div>
                            <div className="col-sm-12 col-md">
                                <input type="password" placeholder="Password" value={password}
                                    style={{ width: "85%" }} onChange={e => onChangePassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="row responsive-label">
                            <div className="col-sm-12 col-md-3"><label>Repeat Password</label></div>
                            <div className="col-sm-12 col-md">
                                <input type="password" placeholder="Repeat Password" value={repeat}
                                    style={{ width: "85%" }} onChange={e => onChangeRepeat(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md col-md-offset-3">
                                {
                                    error ? <p><mark className="secondary">{error}</mark></p> : <span />
                                }
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12 col-md col-md-offset-3">
                                <button className="button primary"
                                    onClick={e => { onSubmit(); e.preventDefault(); }} style={{ minWidth: "13em" }}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
        }
    </div>
);

Register.propTypes = {
    success: PropTypes.bool,
    username: PropTypes.string,
    password: PropTypes.string,
    repeat: PropTypes.string,
    error: PropTypes.string,
    onChangeUsername: PropTypes.func,
    onChangePassword: PropTypes.func,
    onChangeRepeat: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default Register;