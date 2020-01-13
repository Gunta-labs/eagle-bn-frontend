/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { facebookLoginAction } from '../../Redux/Actions/facebookLoginAction';
import faceIcon from '../../Assets/images/icon_facebook.svg';
import checkToken from '../../helper/helper';

export class LoginFacebook extends React.Component {
	facebookLog = ({ response, provider }) => {
		const { facebook } = this.props;
		let { accessToken } = response;
		facebook(accessToken);
	};
	render() {
		if (checkToken()) window.location = '/';
		const logFacebook = (
			<div>
				<React.Fragment>
					<FacebookLogin
						appId='2618632188182397'
						callback={response => this.facebookLog({ response, provider: 'facebook' })}
						cssClass='btn-face btn2 Face'
						icon={<img className='socialButtonImg' src={faceIcon} alt='social logo' />}
						textButton='Facebook'
					/>
				</React.Fragment>
			</div>
		);
		const display = logFacebook;
		return display;
	}
}

LoginFacebook.propTypes = {
	facebook: PropTypes.func.isRequired,
};
const mapStateToProps = props => ({
	user: props.facebook.user,
	error: props.facebook.error,
	isLoggedIn: props.facebook.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
	facebook: accessToken => dispatch(facebookLoginAction(accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFacebook);
