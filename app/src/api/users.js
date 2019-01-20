import { post } from "./base";

export function registerUser(username, password) {
    return post("/users", { username, password });
}

export function activateAccount(token) {
    return post("/users/activate", { token });
}