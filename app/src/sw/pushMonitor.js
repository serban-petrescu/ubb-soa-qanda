import { EventEmitter } from "events";
import { messageHelper } from "./register";

function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error();
        }
    });
}

class PushMonitor extends EventEmitter {
    constructor() {
        super();
        this.supported = 'serviceWorker' in navigator && 'PushManager' in window;
        this.subscribed = null;
        this.permitted = false;
        this.checkPermission();
        this.checkSubscription();
    }

    getSubscribed() {
        return this.subscribed;
    }

    getSupported() {
        return this.supported;
    }

    getPermitted() {
        return this.permitted;
    }

    setSubscribed(value) {
        this.subscribed = value;
        this.emit("subscription", value);
        return value;
    }

    setPermitted(value) {
        this.permitted = value;
        this.emit("permission", value);
        return value;
    }

    sendToken(token) {
        return messageHelper.sendWithReply("SET_TOKEN", token)
            .then(() => true)
            .catch(() => false);
    }

    subscribe() {
        const onReceive = value => {
            if (value) {
                this.setSubscribed(true);
            }
            return value;
        };
        return askPermission()
            .then(() => messageHelper.sendWithReply("SUBSCRIBE"))
            .then(onReceive)
            .catch(() => false)
    }

    unsubscribe() {
        const onReceive = value => {
            if (value) {
                this.setSubscribed(false);
            }
            return value;
        };
        return messageHelper.sendWithReply("UNSUBSCRIBE")
            .then(onReceive)
            .catch(() => false)
    }

    checkSubscription() {
        return messageHelper.sendWithReply("CHECK_SUBSCRIPTION")
            .catch(() => false)
            .then(value => this.setSubscribed(value))
            .then(() => this.checkPermission());
    }

    checkPermission() {
        return messageHelper.sendWithReply("CHECK_PERMISSION")
            .catch(() => false)
            .then(value => this.setPermitted(value));
    }
}

const monitor = new PushMonitor();

export default monitor;