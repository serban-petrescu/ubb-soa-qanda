import storage from "./storage";
import logout from "./logout";
import parse from "./parse";

let timerId = null;

export function clearTimer() {
    if (timerId) {
        clearTimeout(timerId);
    }
}

export function updateTimer(token = storage.get()) {
    clearTimer();
    let payload = parse(token);

    if (payload && payload.exp) {
        const now = new Date().getTime();
        const exp = payload.exp * 1000;
        if (now < exp) {
            timerId = setTimeout(exp - now, logout);
        } else {
            storage.silentClear();
        }
    }
}