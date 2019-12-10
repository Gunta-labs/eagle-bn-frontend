import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import VerifyReducer from './verify.reducer';
import RequestReducer from './request.reducer';

const allReducers = combineReducers({
	login: LoginReducer,
	Verify: VerifyReducer,
	Request: RequestReducer,
});

export default allReducers;
