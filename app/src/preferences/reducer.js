export default function (state = { push: {}, email: {}, emailAddress: "" }, action) {
    switch (action.type) {
        case "PREFERENCES_INIT":
            return { push: {}, email: {}, emailAddress: "" };
        case "PREFERENCES_RECEIVE":
            return { ...state, ...action.data };
        case "PREFERENCES_UPDATE_FLAG":
            return { ...state, [action.group]: { ...state[action.group], [action.flag]: action.value } };
        case "PREFERENCES_UPDATE_PROPERTY":
            return { ...state, [action.property]: action.value };
        default:
            return state;
    }
}