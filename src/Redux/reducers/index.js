import { combineReducers } from 'redux';
import VerifyReducer from './verify.reducer';
import RequestReducer from './request.reducer';
import ResetPasswordReducer from './reset.password.reducer';
import LoginReducer from './loginReducer';
import { signupReducer } from './signup.reducer';
import accommodationReducer from './accommodation.reducer';
import MakeTripRequest from './trip.request.reducer';
import destinations, { accomodations } from './destinations.reducer';
import FacebookReducer from './facebookReducer';
import AllAcommodation from './allAccomodation';
import SingleAccomodations from './singleAccomodation.reducer';
import AccomodationFeedback from './accomodatiosFeedback.reducer';
import UserProfileReducer from './userProfile.reducer';

const allReducers = combineReducers({
	ResetPasswordReducer,
	Verify: VerifyReducer,
	Request: RequestReducer,
	loginProp: LoginReducer,
	signup: signupReducer,
	accommodation: accommodationReducer,
	MakeTripRequest,
	destSats: destinations,
	accomodations,
	facebook: FacebookReducer,
	accomodation: AllAcommodation,
	SingleAccomodations,
	AccomodationFeedback,
	profile: UserProfileReducer,
});

export default allReducers;
