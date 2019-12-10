import { combineReducers } from 'redux';
import VerifyReducer from './verify.reducer';
import ResetPasswordReducer from './reset.password.reducer';
import LoginReducer from './loginReducer';
import { signupReducer } from './signup.reducer';

const allReducers = combineReducers({
	ResetPasswordReducer,
	Verify: VerifyReducer,
	loginProp: LoginReducer,
	signup: signupReducer,
});

export default allReducers;
