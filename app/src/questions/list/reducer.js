export default function (state = { questions: {}, hasMore: true }, action) {
    switch (action.type) {
        case "QUESTION_LIST_INIT":
            return { questions: {}, hasMore: true };
        case "QUESTION_LIST_RECEIVE":
            return { questions: {...state.questions, ...action.questions}, hasMore: Object.keys(action.questions).length > 0 };
        default:
            return state;
    }
}