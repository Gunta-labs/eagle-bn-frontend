import { combineReducers } from 'redux';
import VerifyReducer from './verify.reducer';
import RequestReducer from './request.reducer';
import ResetPasswordReducer from './reset.password.reducer';
import LoginReducer from './loginReducer';
import { signupReducer } from './signup.reducer';
import accommodationReducer from './accommodation.reducer';
import MakeTripRequest from './trip.request.reducer';

const allReducers = combineReducers({
	ResetPasswordReducer,
	Verify: VerifyReducer,
	Request: RequestReducer,
	loginProp: LoginReducer,
	signup: signupReducer,
	accommodation: accommodationReducer,
	MakeTripRequest,
});

export default allReducers;
