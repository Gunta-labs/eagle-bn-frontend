import compHelper from '../../helper/trip.request.form.data';
import userProfile from '../../helper/user.helper';

jest.unmock('axios');
describe('test make trip request helpers', () => {
	it.only('test component helpers', done => {
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
		expect(typeof (await userProfile(1))).toEqual('object');
		expect(await userProfile(1000)).toEqual(false);
		done();
	});
});
