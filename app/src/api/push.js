import { put, del } from "./base";

export function updateSubscription(subscription) {
    return put("/notifications/preferences/push-subscription", subscription);
}

export function deleteSubscription() {
    return del("/notifications/preferences/push-subscription");
}