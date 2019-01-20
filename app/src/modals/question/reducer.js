export default function (state = { open: false }, action) {
    switch (action.type) {
        case "MODALS_QUESTION_OPEN":
            return { ...state, open: true, text: action.text, questionId: action.questionId };
        case "MODALS_QUESTION_TEXT_CHANGE":
            return { ...state, text: action.text };
        case "WINDOW_HASH_CHANGE":
        case "MODALS_QUESTION_CLOSE":
            return { open: false };
        default:
            return state;
    }
}