export default function (state = { open: false }, action) {
    switch (action.type) {
        case "MODALS_TOAST_OPEN":
            return { ...state, open: true, text: action.text };
        case "WINDOW_HASH_CHANGE":
        case "MODALS_TOAST_CLOSE":
            return { open: false };
        default:
            return state;
    }
}