import store from "store";
import { EventEmitter } from "events";

class Storage extends EventEmitter {
    constructor(key) {
        super();
        this.key = key;
    }

    init() {
        const token = this.get();
        if (token) {
            this.emit("change", token);
        }
    }
    
    get() {
        return store.get(this.key);
    }

    set(value) {
        store.set(this.key, value);
        this.emit("change", value);
    }

    clear() {
        this.set("");
    }

    silentClear() {
        store.set(this.key, "");
    }
}

export default new Storage("jwt-token");