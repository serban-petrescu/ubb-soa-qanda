import parse from "./parse";

export default function reducer(state = { }, action) {
    if (action.type === "TOKEN_SET") {
        return { token: action.token, payload: parse(action.token) };
    } else if (action.type === "TOKEN_CLEAR") {
        return { };
    } else {
        return state;
    }
}
