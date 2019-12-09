import BASE_URL from './config';
import axios from 'axios';

const apis = {
	async verifyUser(token) {
		const result = await axios.get(`${BASE_URL}users/verify/${token}`);
		return result.data;
	},
	async loginUser(data) {
		const login = await axios.post(`${BASE_URL}users/login`, data);
		return login;
	},
};

export default apis;
