import BASE_URL from './config';
import axios from 'axios';

const apis = {
	async verifyUser(token) {
		const result = await axios.get(`${BASE_URL}users/verify/${token}`);
		return result.data;
	},
	async getRequest(token) {
		const result = await axios.get(`${BASE_URL}requests`, {
			headers: { Authorization: token },
		});
		return result.data;
	},
	async loginUser(data) {
		const login = await axios.post(`${BASE_URL}users/login`, data);
		return login;
	},
	signup(user) {
		return axios.post(`${BASE_URL}users/signup`, user);
	},
	getUserProfile(userId) {
		return axios.get(`${BASE_URL}users/${userId}/profile`);
	},
};

export default apis;
