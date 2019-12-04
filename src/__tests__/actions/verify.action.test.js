import config from '../../helper/test.helper';
import constants from '../../Redux/constants';
import Data from '../../__mocks__/data/verify.data';

jest.mock('axios');
let store;
describe('test verifyUser actions', () => {
	it('should have the pending action', () => {
		store = config.mockStore(Data.initialState);
		store.dispatch({
			type: constants.VERIFY_PENDING,
			pending: true,
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_PENDING');
	});
	it('should have the success action', () => {
		store = config.mockStore(Data.successState);
		store.dispatch({
			type: constants.VERIFY_SUCCESS,
			payload: {
				msg: 'verified',
			},
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_SUCCESS');
		expect(actions[0].payload.msg).toEqual('verified');
	});
	it('should have the error action', () => {
		Data.mockFailure();
		store = config.mockStore(Data.errorState);
		store.dispatch({
			type: constants.VERIFY_ERROR,
			error: {
				msg: 'error',
			},
		});
		const actions = store.getActions();
		expect(actions[0].type).toEqual('VERIFY_ERROR');
	});
});
