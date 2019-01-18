export default function (state = { username: "", error: false, password: "" }, action) {
    switch (action.type) {
        case "LOGIN_INIT":
            return { username: "", error: false, password: "" };
        case "LOGIN_CHANGE":
            return { ...state, [action.property]: action.value };
        default:
            return state;
    }
}