export default function (state = { answers: {}, answer: "" }, action) {
    switch (action.type) {
        case "QUESTION_SINGLE_INIT":
            return { answers: {}, answer: "" };
        case "QUESTION_SINGLE_RECEIVE":
            return { ...state, ...action.data };
        case "QUESTION_SINGLE_ANSWER_CHANGE":
            return { ...state, answer: action.answer };
        default:
            return state;
    }
}