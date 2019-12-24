import React from 'react';
import googleIcon from '../../Assets/images/icon_google.svg';
import Button from './socialButton';
import BaseUrl from '../../Api/config';
import LoginFacebook from './facebookLogin';

class SocialLogin extends React.Component {
	GoogleLogin = () => {
		window.location.assign(`${BaseUrl}/users/google`);
	};
	render() {
		return (
			<div className='social'>
				<div>
					<LoginFacebook />
				</div>
				<div>
					<Button
						name='Google'
						logo={googleIcon}
						styleClass='btn2 btn-google Goo'
						onClick={this.GoogleLogin}
					/>
				</div>
			</div>
		);
	}
}
export default SocialLogin;
