import { createStore, combineReducers } from "redux";

import loginReducer from "./login/reducer";
import questionsReducer from "./questions/reducer";
import { reducer as tokenReducer } from "./token/store";

const reducer = combineReducers({
    login: loginReducer,
    token: tokenReducer,
    questions: questionsReducer
});

const store = createStore(reducer, {});

export default store;