import { combineReducers } from 'redux';
import VerifyReducer from './verify.reducer';
import ResetPasswordReducer from './reset.password.reducer';

const allReducers = combineReducers({
	ResetPasswordReducer,
	Verify: VerifyReducer,
});

export default allReducers;
