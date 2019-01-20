import store from "../store";

export function openEditQuestion(questionId, text) {
    store.dispatch({ type: "MODALS_QUESTION_OPEN", questionId, text });
}

export function openEditAnswer(questionId, answerId, text) {
    store.dispatch({ type: "MODALS_ANSWER_OPEN", questionId, answerId, text });
}

export function openModalForError(error) {
    store.dispatch({
        type: "MODALS_ERROR_OPEN", 
        text: (typeof error === "string" ? error : error.message) || "A technical error occurred." 
    });
}

let toastTimer = null;
export function toast(text, duration = 2000) {
    if (toastTimer) {
        clearTimeout(toastTimer);
    }
    store.dispatch({type: "MODALS_TOAST_OPEN", text});
    toastTimer = setTimeout(() => store.dispatch({type: "MODALS_TOAST_CLOSE"}), duration);
}