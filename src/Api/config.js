export default /localhost|staging/.test(window.location.host)
	? 'https://eagle-bn-backend-staging.herokuapp.com/api/v1/'
	: 'https://eagle-bn-backend.herokuapp.com/api/v1/';
