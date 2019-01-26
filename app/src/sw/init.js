import store from "../store";
import monitor from "./pushMonitor";

monitor.addListener("subscription", value => store.dispatch({ type: "PUSH_SUBSCRIPTION_UPDATED", value }));
monitor.addListener("permission", value => store.dispatch({ type: "PUSH_PERMISSION_UPDATED", value }));
store.dispatch({
    type: "PUSH_INIT",
    flags: {
        subscribed: monitor.subscribed,
        supported: monitor.supported,
        permitted: monitor.permitted
    }
});