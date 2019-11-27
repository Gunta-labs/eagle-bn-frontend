import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';

const allReducers = combineReducers({
	login: LoginReducer,
});

export default allReducers;
