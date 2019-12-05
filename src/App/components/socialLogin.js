/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
//import facebookIcon from '../assets/imgs/icon_google.png';
//import googleIcon from '../assets/imgs/icon_facebook.png';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import '../../Assets/scss/custom/socialBUtton.scss';
import { socialLoginAction } from '../../Redux/Actions/socialLoginAction';

export class socialLogin extends Component {
	responseSocialLog = ({ response, provider }) => {
		const { onSocialLogin } = this.props;
		let { accessToken } = response;
		console.log(response);
		// console.log(access_token);

		onSocialLogin(accessToken, provider);
	};
	render() {
		return (
			<div className='d-flex'>
				<div className='social'>
					<React.Fragment className='social'>
						<FacebookLogin
							appId='2618632188182397'
							callback={response => this.responseSocialLog({ response, provider: 'facebook' })}
							render={renderProps => (
								<button id='facebook' className='btn-face btn' onClick={renderProps.onClick}>
									Facebook
								</button>
							)}
						/>
						<GoogleLogin
							id='google'
							clientId='902615567512-c1j89kph4215qhptgihn5e6d2o60470f.apps.googleusercontent.com'
							//clientId='421632939170-a4an5ufi14580qmt5ll9d7r7bkesjmfu.apps.googleusercontent.com'
							render={renderProps => (
								<button id='google' className='btn-google btn' onClick={renderProps.onClick}>
									Google
								</button>
							)}
							onSuccess={response => this.responseSocialLog({ response, provider: 'google' })}
							onFailure={response => this.responseSocialLog({ response, provider: 'google' })}
							//cookiePolicy='single_host_origin'
						/>
					</React.Fragment>
				</div>
			</div>
		);
	}
}

socialLogin.propTypes = {
	onSocialLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	onSocialLogin: (accessToken, provider) => dispatch(socialLoginAction(accessToken, provider)),
});

export default connect(mapDispatchToProps)(socialLogin);
