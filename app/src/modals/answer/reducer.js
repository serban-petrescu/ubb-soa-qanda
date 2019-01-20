export default function (state = { open: false }, action) {
    switch (action.type) {
        case "MODALS_ANSWER_OPEN":
            return { ...state, open: true, text: action.text, answerId: action.answerId, questionId: action.questionId };
        case "MODALS_ANSWER_TEXT_CHANGE":
            return { ...state, text: action.text };
        case "WINDOW_HASH_CHANGE":
        case "MODALS_ANSWER_CLOSE":
            return { open: false };
        default:
            return state;
    }
}