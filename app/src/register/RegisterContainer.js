import { connect } from "react-redux";
import { compose, setDisplayName, withProps, lifecycle } from "recompose";
import validator from "email-validator";

import store from "../store";
import Register from "./Register";
import { registerUser } from "../api/users";
import { openModalForError } from "../modals/modals";

const getState = (state = store.getState()) => state.register;

const change = (property, value) => store.dispatch({type: "REGISTER_CHANGE", property, value});
const init = () => store.dispatch({type: "REGISTER_INIT"});

const onSubmit = () => {
    const {username, password, repeat} = getState();
    if (!validator.validate(username)) {
        change("error", "The email is invalid!");
    } else if (!password || password.length < 8) {
        change("error", "The password must be at least 8 characters long!");
    } else if (password !== repeat) {
        change("error", "The given passwords do not match!");
    } else {
        registerUser(username, password)
            .then(() => change("success", true))
            .catch(openModalForError);
    }
}

export default compose(
    setDisplayName("RegisterContainer"),
    withProps({
        onChangeUsername: value => change("username", value),
        onChangePassword: value => change("password", value),
        onChangeRepeat: value => change("repeat", value),
        onSubmit
    }),
    connect((state, props) => ({...getState(state), ...props})),
    lifecycle({ componentDidMount: init })
)(Register);