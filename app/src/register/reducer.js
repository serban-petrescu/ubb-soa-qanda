export default function (state = { username: "", repeat: "", error: "", password: "", success: false }, action) {
    switch (action.type) {
        case "REGISTER_INIT":
            return { username: "", repeat: "", error: "", password: "", success: false };
        case "REGISTER_CHANGE":
            return { ...state, [action.property]: action.value };
        default:
            return state;
    }
}