import { createStore, combineReducers } from "redux";

import modalsReducer from "./modals/reducer";
import loginReducer from "./login/reducer";
import registerReducer from "./register/reducer";
import questionsReducer from "./questions/reducer";
import preferencesReducer from "./preferences/reducer";
import tokenReducer from "./token/reducer";
import pushReducer from "./sw/reducer";

const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    token: tokenReducer,
    questions: questionsReducer,
    modals: modalsReducer,
    preferences: preferencesReducer,
    push: pushReducer
});

const store = createStore(reducer, {});

window.addEventListener("hashchange", () => store.dispatch({ type: "WINDOW_HASH_CHANGE", hash: window.location.hash }));

export default store;