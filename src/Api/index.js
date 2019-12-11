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
	signup(user) {
		return axios.post(`${BASE_URL}users/signup`, user);
	},
	createAccommodation(data, token) {
		return axios.post(`${BASE_URL}accommodations`, data, {
			headers: { Authorization: token, contentType: 'application/x-www-form-urlencoded' },
		});
	},
};

export default apis;
