// external
import { combineReducers } from "redux";

// internal
import reducer from './reducers'

const rootReducer = combineReducers({
    reducers: reducer
});

export default rootReducer;
