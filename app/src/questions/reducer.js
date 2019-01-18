import { combineReducers } from "redux";

import listReducer from "./list/reducer";
import createReducer from "./create/reducer";
import singleReducer from "./single/reducer";

export default combineReducers({
    list: listReducer,
    create: createReducer,
    single: singleReducer
});