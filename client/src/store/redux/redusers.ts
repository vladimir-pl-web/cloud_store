import { combineReducers } from 'redux';
import { fileReducer } from './files/fileReducer';
import { userReducer } from './users/userReducer';


const reducers = combineReducers({
 users: userReducer,
 files: fileReducer
});

export default reducers;