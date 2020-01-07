import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'querystring';
import authentication, { socialLog } from '../../Redux/Actions/login.actions';
import bckimg from '../../Assets/images/login.svg';
import Header from '../Components/Header';
import SocialLogin from '../Components/social.login';

export class Login extends React.Component {
	constructor(props) {
		super(props);
		const { location } = this.props;
		if (location) {
			const values = QueryString.parse(location.search);
			values.token = values['?token'];
			if (values.token) {
				localStorage.setItem('barefoot_token', values.token);
				this.props.socialLog();
			}
		}
	}
	state = {
		email: '',
		password: '',
	};

	handleInput = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { authentication, authPending } = this.props;
		const { email, password } = this.state;
		const data = {
			email,
			password,
		};
		authPending();
		authentication(data);
	};

	render() {
		const { password, email } = this.state;
		const { error, isLoggedIn, logPending } = this.props.user;
		const loginDisplay = (
			<div className='d-flex'>
				<Header />
				<img className='vh-100 vw-100 bg-img' src={bckimg} alt='bg' />
				<div className='container signup'>
					<div className='row'>
						<div className='col-md-6 col-lg-6 text-center bg-sm-white rounded'>
							<h3 className='text-center mb-4'> Login </h3>
							{error && <span className=' d-block alert alert-danger'>{error}</span>}
							<SocialLogin />
							<hr />
							<form onSubmit={this.handleSubmit}>
								<div className='form-label-group mt-4'>
									<input
										type='email'
										name='email'
										className='form-control'
										onChange={this.handleInput}
										placeholder='Email address'
										required={true}
										value={email}
									/>
								</div>
								<div className='form-label-group mt-4'>
									<input
										type='password'
										name='password'
										className='form-control'
										onChange={this.handleInput}
										placeholder='Password'
										required={true}
										value={password}
									/>
								</div>
								<br />
								<p>
									<Link to={`/password/reset`} activeclassname='active'>
										{' '}
										Forgot Password{' '}
									</Link>{' '}
								</p>
								<button className='btn-primary btn-block my-3 form-control' type='submit'>
									{logPending ? '...' : 'Login'}
								</button>
								New to Barefoot?
								<Link to={`/signup`} activeclassname='active'>
									{' '}
									signup{' '}
								</Link>{' '}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
		const display = !isLoggedIn ? loginDisplay : (window.location = '/');
		return display;
	}
}

Login.propTypes = {
	user: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => {
	return {
		authentication: async data => dispatch(await authentication(data)),
		socialLog: async data => dispatch(await socialLog()),
		authPending: () => dispatch({ type: 'login_pending', payload: {} }),
	};
};

export const mapStateToProps = ({ loginProp }) => ({
	user: loginProp,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
