import { checkSupplierOrtAdmin } from '../../helper/checkRole';
import * as checkToken from '../../helper/helper';

describe('single request', () => {
	it('Should return request sideNav menu', done => {
		checkToken.default = jest.fn();
		checkToken.default.mockReturnValue({
			fullname: 'lemoisson',
			role: 'requester',
		});
		expect(checkSupplierOrtAdmin()).toEqual(false);
		done();
	});
	it('Should return host side nav menu', done => {
		checkToken.default = jest.fn();
		checkToken.default.mockReturnValueOnce({
			fullname: 'lemoisson',
			role: 'host',
		});
		expect(checkSupplierOrtAdmin()).toEqual(true);
		done();
	});
});
