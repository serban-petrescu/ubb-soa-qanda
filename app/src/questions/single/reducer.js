export default function (state = { loading: true, answers: {}, answer: "", modals: { question: false, answer: false } }, action) {
    switch (action.type) {
        case "QUESTION_SINGLE_INIT":
            return { loading: true, answers: [], answer: "", modals: { question: false, answer: false } };
        case "QUESTION_SINGLE_RECEIVE":
            return { ...state, ...action.data, loading: false };
        case "QUESTION_SINGLE_RECEIVE_ANSWER":
            return { ...state, answers: { ...state.answers, [action.answer._id]: action.answer } };
        case "QUESTION_SINGLE_ANSWER_CHANGE":
            return { ...state, answer: action.answer };
        case "UPDATE_QUESTION_TEXT_RECEIVE":
            if (state._id === action.questionId) {
                return { ...state, text: action.text };
            } else {
                return state;
            }
        case "UPDATE_ANSWER_TEXT_RECEIVE":
            if (state._id === action.questionId) {
                return {
                    ...state,
                    answers: {
                        ...state.answers,
                        [action.answerId]: { ...state.answers[action.answerId], text: action.text }
                    }
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}