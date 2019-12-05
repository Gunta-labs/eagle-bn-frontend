import axios from 'axios';
import { baseURL } from './config/index';

const apis = {
	SocialaLoginAPI(accessToken, socialType) {
		const user = { access_token: accessToken };
		return axios
			.post(`${baseURL}users/auth/${socialType}`, user)
			.then(res => console.log('Success' + res))
			.catch(error => {
				return 'Failled' + error;
			});
	},
};

export default apis;
