import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const middleWares = [thunk];
export const mockStore = configureMockStore(middleWares);
const initialState = {
	message: null,
	error: null,
	pending: false,
	payload: { name: 'hello' },
	user: {},
	signup: false,
	signing: false,
	requestResetStatus: 'not_started',
	resetPasswordStatus: 'not_started',
	destSats: { payload: { data: [] }, pending: false },
};

export default mockStore(initialState);
