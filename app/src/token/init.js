import store from "../store";
import storage from "./storage";
import { updateTimer, clearTimer } from "./timer";
import pushMonitor from "../sw/pushMonitor";

storage.addListener("change", token => token ? store.dispatch({type: "TOKEN_SET", token}) : store.dispatch({type: "TOKEN_CLEAR" }));
storage.addListener("change", token => token ? updateTimer(token) : clearTimer());
storage.addListener("change", token => pushMonitor.sendToken(token));
storage.init();
