import {combineReducers} from 'redux';
import taskReducer from './handle-action';
const rootReducer = combineReducers({
    tasks: taskReducer
});
export default rootReducer;