export default process.env.NODE_ENV === 'production'
	? 'https://eagle-bn-backend.herokuapp.com/api/v1/'
	: 'https://eagle-bn-backend-staging.herokuapp.com/api/v1/';
