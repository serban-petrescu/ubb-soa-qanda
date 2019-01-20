import store from "store";
import reduxStore from "../store";

const STORE_KEY = "jwt-token";

let timerId = null;

function updateTimer(token = storage.get()) {
    if (timerId) {
        clearTimeout(timerId);
    }
    
    let payload = parseJwt(token);

    if (payload && payload.exp) {
        const now = new Date().getTime();
        const exp = payload.exp * 1000;
        if (now < exp) {
            timerId = setTimeout(exp - now, logout);
        } else {
            store.set(STORE_KEY, "");
        }
    }
}

export function logout(){
    storage.clear();
    window.location.assign("#/");
    window.location.reload(); 
}

const storage = {
    get() {
        return store.get(STORE_KEY);
    },

    set(jwt) {
        store.set(STORE_KEY, jwt);
        reduxStore.dispatch({type: "TOKEN_SET", token: jwt});
        updateTimer(jwt);
    },

    clear() {
        store.set(STORE_KEY, "");
        reduxStore.dispatch({type: "TOKEN_CLEAR" });
    }
}

function parseJwt(jwt) {
    try {
        return JSON.parse(atob(jwt.split(".")[1] || ""));
    } catch (e) {
        return {};
    }
}

export default storage;

export function reducer(state = { token: storage.get(), payload: parseJwt(storage.get()) }, action) {
    if (action.type === "TOKEN_SET") {
        return { token: action.token, payload: parseJwt(action.token) };
    } else if (action.type === "TOKEN_CLEAR") {
        return { };
    } else {
        return state;
    }
}

updateTimer();