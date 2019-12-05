import React from 'react';
import faceIcon from '../../Assets/images/icon_facebook.png';
import googleIcon from '../../Assets/images/icon_google.png';
import Button from './socialButton';

const SocialLogin = () => {
	const FaceboobLogin = () => {
		window.location.assign('http://localhost:3000/api/v1/users/auth/facebook');
	};

	const GoogleLogin = () => {
		window.location.assign('http://localhost:3000/api/v1/users/google');
	};

	return (
		<div className='social'>
			<Button name='Facebook' logo={faceIcon} styleClass='btn-face btn' onClick={FaceboobLogin} />
			<Button name='Google' logo={googleIcon} styleClass='btn-google btn' onClick={GoogleLogin} />
		</div>
	);
};

export default SocialLogin;
