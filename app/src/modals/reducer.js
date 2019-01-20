import { combineReducers } from "redux";

import questionReducer from "./question/reducer";
import answerReducer from "./answer/reducer";
import errorReducer from "./error/reducer";
import toastReducer from "./toast/reducer";

export default combineReducers({
    question: questionReducer,
    answer: answerReducer,
    error: errorReducer,
    toast: toastReducer
});