import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import VerifyReducer from './verify.reducer';

const allReducers = combineReducers({
	login: LoginReducer,
	Verify: VerifyReducer,
});

export default allReducers;
