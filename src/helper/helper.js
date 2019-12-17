import jwt from 'jsonwebtoken';

export const token = localStorage.getItem('barefoot_token');

export default () => {
	try {
		const userData = jwt.decode(token);
		if (userData === null) throw new Error();
		return userData;
	} catch (err) {
		return null;
	}
};
