import axios from 'axios';

const apis = {
	verifyUser(token) {
		return axios
			.get(`http://eagle-bn-backend-staging.herokuapp.com/api/v1/users/verify/${token}`)
			.then(result => {
				return result.data;
			})
			.catch(err => {
				return err.response;
			});
	},
};

export default apis;
