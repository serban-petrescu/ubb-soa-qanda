import { post } from "./base";

export function createToken({ username, password }) {
    const body = new URLSearchParams({ username, password, grant_type: "password" }).toString();
    return post("/oauth/token", body, { "Content-Type": "application/x-www-form-urlencoded" });
}