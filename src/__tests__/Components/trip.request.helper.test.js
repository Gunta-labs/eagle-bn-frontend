import compHelper from '../../helper/trip.request.form.data';
import userProfile from '../../helper/user.helper';

jest.unmock('axios');
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
		let user = await userProfile(1);
		expect(typeof user).toEqual('object');
		user = await userProfile(1000);
		expect(user).toEqual(false);
		done();
	});
});
