import { get, put } from "./base";

export function readPreferences() {
    return get("/notifications/preferences");
}

export function upsertPreferences(data) {
    return put("/notifications/preferences", data);
}