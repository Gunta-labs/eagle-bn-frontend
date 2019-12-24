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
	async changeRole(token, data) {
		const role = await axios.put(`${BASE_URL}users/role`, data, {
			headers: { Authorization: token },
		});
		return role;
	},
	async getUsersRoles(token) {
		const roles = await axios.get(`${BASE_URL}users/roles`, {
			headers: { Authorization: token },
		});
		return roles;
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
	bookAccommodation(data, token) {
		return axios.post(`${BASE_URL}bookings`, data, {
			headers: { Authorization: token },
		});
	},
	async getAllAccomodations() {
		const accommodations = await axios.get(`${BASE_URL}accommodations`);
		return accommodations;
	},
	singleAccomodation(id) {
		return axios.get(`${BASE_URL}accommodations/${id}`);
	},
	GetFeeback(id) {
		return axios.get(`${BASE_URL}accommodations/${id}/rating`);
	},
	logout(token) {
		return axios.patch(`${BASE_URL}users/logout`, null, {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
	},
	async filterRequest(payload, token) {
		return await axios.get(`${BASE_URL}requests/search?${payload}`, {
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
	},
	getManagerRequest(managerId, token) {
		return axios.get(`${BASE_URL}requests/managers/${managerId}`, {
			headers: {
				Authorization: token,
			},
		});
	},
	updateAccommodation(data, token, id) {
		return axios.patch(`${BASE_URL}accommodations/${id}`, data, {
			headers: { Authorization: token },
		});
	},
	changeRequestStatus(requestId, status, token) {
		return axios.patch(`${BASE_URL}requests/${requestId}/${status}`, null, {
			headers: {
				Authorization: token,
			},
		});
	},
};

export default apis;
