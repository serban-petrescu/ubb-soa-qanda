import React from "react";
import PropTypes from "prop-types";

import Menu from "../Menu";
import EnabledTypes from "./EnabledTypes";

const Preferences = ({ push, email, emailAddress, onChangePush, onChangeEmail, onChangeEmailAddress, onSave }) => (
    <div>
        <Menu />
        <div className="container">
            <EnabledTypes title="Email Notifications" onChange={onChangeEmail} {...email}>
                <div className="row responsive-label">
                    <div className="col-sm-12 col-md-3"><label>Email Address</label></div>
                    <div className="col-sm-12 col-md">
                        <input type="text" value={emailAddress || ""} style={{ width: "85%" }} 
                            onChange={e => onChangeEmailAddress(e.target.value)} />
                    </div>
                </div>
            </EnabledTypes>
            <EnabledTypes title="Push Notifications" onChange={onChangePush} {...push} />
            <button className="primary" onClick={onSave}>Save</button>
        </div>
    </div>
);

Preferences.propTypes = {
    push: PropTypes.shape({
        questionAnswered: PropTypes.bool,
        questionUpdated: PropTypes.bool,
        answerUpdated: PropTypes.bool
    }),
    email: PropTypes.shape({
        questionAnswered: PropTypes.bool,
        questionUpdated: PropTypes.bool,
        answerUpdated: PropTypes.bool
    }),
    emailAddress: PropTypes.string,
    onChangePush: PropTypes.func,
    onChangeEmail: PropTypes.func,
    onChangeEmailAddress: PropTypes.func,
    onSave: PropTypes.func
};

export default Preferences;
