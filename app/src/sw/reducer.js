export default function reducer(state = {supported: false, permitted: false, subscribed: false}, action) {
    switch (action.type) {
        case "PUSH_INIT":
            return {...state, ...action.flags};
        case "PUSH_PERMISSION_UPDATED":
            return {...state, permitted: action.value};
        case "PUSH_SUBSCRIPTION_UPDATED":
            return {...state, subscribed: action.value};
        default:
            return state;
    }
}