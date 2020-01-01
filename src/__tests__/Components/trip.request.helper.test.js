import compHelper from '../../helper/trip.request.form.data';
import userProfile from '../../helper/user.helper';
import { mockSuccess } from '../../__mocks__/data/profile.mock.data';
import sinon from 'sinon';
import axios from 'axios';

jest.mock('axios');
describe('test make trip request helpers', () => {
	it('test component helpers', done => {
		const res = compHelper({
			city: 'city',
			country: 'country',
			timeZone: 'gmt',
			returnTime: new Date(),
			'city-0': 'c',
			'country-0': 'co',
			'reason-0': 'reas',
			'departureTime-0': new Date(),
		});
		expect(typeof res).toEqual('object');
		done();
	});
	it('test get user profile', async done => {
		mockSuccess();
		sinon.spy(axios, 'get');
		userProfile(1);
		const result = await axios.get.getCall(0).returnValue;
		expect(typeof result).toEqual('object');
		done();
	});
});
