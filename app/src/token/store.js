import store from "store";
import reduxStore from "../store";

const STORE_KEY = "jwt-token";

const storage = {
    get() {
        return store.get(STORE_KEY);
    },

    set(jwt) {
        store.set(STORE_KEY, jwt);
        reduxStore.dispatch({type: "TOKEN_SET", token: jwt});
    },

    clear() {
        store.set(STORE_KEY, "");
    }
}

export default storage;

export function reducer(state = { token: storage.get() }, action) {
    if (action.type === "TOKEN_SET") {
        return { token: action.token };
    } else {
        return state;
    }
}

