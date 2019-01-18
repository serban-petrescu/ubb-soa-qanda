export default function (state = { title: "", text: "", error: "" }, action) {
    switch (action.type) {
        case "QUESTION_CREATE_INIT":
            return { title: "", text: "", error: "" };
        case "QUESTION_CREATE_CHANGE":
            return { ...state, [action.property]: action.value };
        default:
            return state;
    }
}