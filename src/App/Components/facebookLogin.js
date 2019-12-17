/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { facebookLoginAction } from '../../Redux/Actions/facebookLoginAction';
import Button from './socialButton';
import faceIcon from '../../Assets/images/icon_facebook.svg';

export class LoginFacebook extends React.Component {
	facebookLog = ({ response, provider }) => {
		const { facebook } = this.props;
		let { accessToken } = response;
		facebook(accessToken);
	};
	render() {
		const { isLoggedIn } = this.props;
		const logFacebook = (
			<div>
				<React.Fragment>
					<FacebookLogin
						appId='2618632188182397'
						callback={response => this.facebookLog({ response, provider: 'facebook' })}
						render={renderProps => (
							<Button
								name='Facebook'
								logo={faceIcon}
								styleClass='btn-face btn Face'
								onClick={renderProps.onClick}
							/>
						)}
					/>
				</React.Fragment>
			</div>
		);
		const display = !isLoggedIn ? logFacebook : <Redirect to='/dashboard'></Redirect>;
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
