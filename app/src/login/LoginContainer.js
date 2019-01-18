import { connect } from "react-redux";
import { compose, setDisplayName, withProps, lifecycle } from "recompose";

import Login from "./Login";
import store from "../store";
import { createToken } from "../api/oauth";
import token from "../token/store";

const getState = (state = store.getState()) => state.login;

const change = (property, value) => store.dispatch({type: "LOGIN_CHANGE", property, value});
const init = () => store.dispatch({type: "LOGIN_INIT"});

const onSubmit = () => createToken(getState())
    .then(response => {
        token.set(response.access_token);
        window.location.assign("#/");
    }).catch(() => change("error", true));

export default compose(
    setDisplayName("LoginContainer"),
    withProps({
        onChangeUsername: value => change("username", value),
        onChangePassword: value => change("password", value),
        onSubmit
    }),
    connect((state, props) => ({...getState(state), ...props})),
    lifecycle({ componentDidMount: init })
)(Login);