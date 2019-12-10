import jwt from 'jsonwebtoken';

const checkToken = () => {
	const auth = localStorage.getItem('barefoot_token');
	if (!auth) return false;
	try {
		const jwtPayload = jwt.verify(auth, process.env.PRIVATE_KEY);
		return jwtPayload;
	} catch (err) {
		return false;
	}
};

export default checkToken;
