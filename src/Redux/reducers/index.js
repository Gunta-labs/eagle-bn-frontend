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
import BookingReducer from './booking.reducer';
import AllAcommodation from './allAccomodation';
import SingleAccomodations from './singleAccomodation.reducer';
import AccomodationFeedback from './accomodatiosFeedback.reducer';
import DashbordReducer from './/dashboard.reducer';
import Logout from './logout.reducer';
import ManagerApprovalReducer from './manager.approval.reducer';
import filterRequest from './filter.requester.reducer';
import Notification from './notification.reducer';
import UserRoleReducer from './user.role.reducer';
import UpdateAccomodation from './update.accomodation.reducer';
import getOneAcc from './singleAccomodation.reducer';
import Booking from './bookings.list.reducer';
import DeleteAccommodations from './deleteAccommodation.reducer';
import getComment from './get.request.comment.reducer';
import { replyComment, sendComment } from './ comment.reducer';
import ChatReducer from './chat.reducer';
import UpdateRequest from './update.trip.reducer';
import getStats from './stats.reducer';

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
	bookings: BookingReducer,
	accomodation: AllAcommodation,
	SingleAccomodations,
	AccomodationFeedback,
	profile: DashbordReducer,
	Logout,
	ManagerApprovalReducer,
	filterRequest,
	Notification,
	userRole: UserRoleReducer,
	UpdateAccomodation,
	getOneAcc,
	Booking,
	DeleteAccommodations,
	getComment,
	replyComment,
	sendComment,
	ChatReducer,
	UpdateRequest,
	getStats,
});

export default allReducers;
