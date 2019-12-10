import checkToken from '../helper/helper';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const token = jwt.sign(
	{ id: 2, username: 'username', email: 'username@user.name' },
	'erferferferferfer',
	{
		expiresIn: '2s',
	},
);

describe('Test checkToken', () => {
	afterEach(() => {
		localStorage.removeItem('barefoot_token');
	});
	it('should call the function and return false', () => {
		jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
		Object.getPrototypeOf(window.localStorage).getItem = jest.fn(() => 'token token');
		expect(checkToken()).toEqual(null);
		jest.resetAllMocks();
	});
	it('should call checktoken function and return false when token is not avaliable', () => {
		jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
		Object.getPrototypeOf(window.localStorage).getItem = jest.fn(() => null);
		expect(checkToken()).toEqual(null);
		jest.resetAllMocks();
	});

	it('should call call the function and return value', () => {
		localStorage.setItem('barefoot_token', `${token}`);
		jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');
		Object.getPrototypeOf(window.localStorage).getItem = jest.fn(() => `${token}`);
		jest
			.spyOn(jwt, 'decode')
			.mockReturnValue({ id: 2, username: 'username', email: 'username@user.name' });
		expect(checkToken()).toEqual({ id: 2, username: 'username', email: 'username@user.name' });
		jest.resetAllMocks();
	});
});
