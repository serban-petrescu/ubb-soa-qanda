/* global clients */
/* eslint no-restricted-globals: 0 */ 

let token;
const basePath = "/app/index.html";

const auth = () => {
    if (token) {
        return { Authorization: "Bearer " + token };
    } else {
        return {};
    }
}

const handleResponse = response => {
    if (!response.ok) {
        return response.text()
            .then(text => text ? JSON.parse(text) : { message: text })
            .then(body => Promise.reject({ status: response.status, body }));
    } else if (response.status === 204) {
        return {};
    } else {
        return response.text().then(text => text ? JSON.parse(text) : {});
    }
};

export const put = (url, body) => fetch(url, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json", ...auth() },
    body: JSON.stringify(body)
}).then(handleResponse);

export const del = url => fetch(url, { credentials: "include", method: "DELETE", headers: auth() }).then(handleResponse);

export function updateSubscription(subscription) {
    return put("/notifications/preferences/push-subscription", subscription);
}

export function deleteSubscription() {
    return del("/notifications/preferences/push-subscription");
}

var OPTIONS = {
    userVisibleOnly: true,
    applicationServerKey: Uint8Array.from([4, 231, 135, 42, 102, 95, 118, 7, 131, 144, 7, 52, 99, 121, 
        67, 205, 247, 228, 56, 55, 92, 1, 235, 228, 229, 136, 42, 181, 53, 246, 36, 41, 139, 70, 20, 
        160, 127, 84, 15, 13, 20, 254, 183, 204, 8, 84, 140, 61, 33, 216, 177, 144, 7, 108, 220, 13, 
        19, 173, 20, 90, 156, 148, 74, 176, 128])
};

function saveSubscription(subscription) {
    return updateSubscription(subscription);
}

function removeSubscription() {
    return deleteSubscription();
}

function checkSubscription() {
    if (self.registration.pushManager) {
        return self.registration.pushManager.getSubscription();
    } else {
        return Promise.reject();
    }
}

function checkPermission() {
    if (self.registration.pushManager) {
        return self.registration.pushManager.permissionState(OPTIONS);
    } else {
        return Promise.reject();
    }
}

function subscribe() {
    if (self.registration.pushManager) {
        return self.registration.pushManager.subscribe(OPTIONS).then(saveSubscription);
    } else {
        return Promise.reject();
    }
}

function unsubscribe() {
    if (self.registration.pushManager) {
        const onGetSubscription = subscription => {
            if (subscription !== null) {
                return subscription.unsubscribe().then(() => removeSubscription(subscription))
            } else {
                return Promise.reject();
            }
        };
        return self.registration.pushManager.getSubscription()
            .then(onGetSubscription)
            .then(() => true)
            .catch(() => false)
    } else {
        return Promise.reject();
    }
}

self.addEventListener('message', function (event) {
    if (event.data && event.data.type) {
        const reply = value => event.ports[0].postMessage(value);
        switch (event.data.type) {
            case "CHECK_SUBSCRIPTION":
                checkSubscription().then(s => s !== null).catch(() => false).then(reply);
                break;
            case "SUBSCRIBE":
                subscribe().then(() => true).catch(() => false).then(reply);
                break;
            case "UNSUBSCRIBE":
                unsubscribe().then(() => true).catch(() => false).then(reply);
                break;
            case "CHECK_PERMISSION":
                checkPermission().then(access => access !== "denied").catch(() => false).then(reply);
                break;
            case "SET_TOKEN":
                token = event.data.payload || "";
                reply(true);
                break;
            default:
                // no op
                break;
        }
    }
});

function absoluteUrl(path) {
    if (URL) {
        return new URL(basePath + path, self.location.origin).href;
    } else {
        return self.location.origin + basePath + path;
    }
}

function getText(type, data) {
    switch(type) {
        case "answerUpdated": 
            return "An answer to your question " + data.question.title + " was updated by " + data.answer.userId + ".";
        case "questionAnswered": 
            return "You have received an answer to your question " + data.question.title + " from " + data.answer.userId + ".";
        case "questionUpdated": 
            return "The question " + data.title + "  (which you have previously answered) was updated by " + data.userId + ".";
        default:
            return "";
    }
}

function getQuestionId(type, data) {
    switch(type) {
        case "answerUpdated": 
        case "questionAnswered": 
            return data.question._id;
        case "questionUpdated": 
            return data._id;
        default:
            return "";
    }
}

function showNotification(type, data) {
    self.registration.showNotification("Q & A", {
        icon: "/public/favicon.ico",
        body: getText(type, data),
        data: absoluteUrl("#/questions/" + getQuestionId(type, data))
    });
}

function openUrl(url) {
    return clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(windowClients => {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === url) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient && matchingClient.focus) {
                return matchingClient.focus();
            } else if (windowClients.length === 1 && windowClients[0].navigate) {
                return windowClients[0].navigate(url);
            } else {
                return clients.openWindow(url);
            }
        });
}

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("push", function (event) {
    const data = event.data.json();
    showNotification(data.type, data.data);
});

self.addEventListener("notificationclick", function (event) {
    const notification = event.notification;
    event.waitUntil(openUrl(notification.data).then(() => notification.close()));
});
