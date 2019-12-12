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
	createAccommodation(data, token) {
		return axios.post(`${BASE_URL}accommodations`, data, {
			headers: { Authorization: token, contentType: 'application/x-www-form-urlencoded' },
		});
	},
	getUserProfile(userId) {
		return axios.get(`${BASE_URL}users/${userId}/profile`);
	},
	destinationStats() {
		return axios.get(`${BASE_URL}statistics/traveled-destinations`);
	},
	accomodations() {
		return axios.get(`${BASE_URL}accommodations`);
	},
	facebookLoginAPI(accessToken) {
		return axios.post(`${BASE_URL}/users/auth/facebook`, { access_token: accessToken });
	},
	async getAllAccomodations() {
		const accommodations = await axios.get(`${BASE_URL}accommodations`);
		return accommodations;
	},
	async singleAccomodation(id) {
		return await axios.get(`${BASE_URL}accommodations/${id}`);
	},
	async GetFeeback(id) {
		return await axios.get(`${BASE_URL}accommodations/${id}/rating`);
	},
};

export default apis;
