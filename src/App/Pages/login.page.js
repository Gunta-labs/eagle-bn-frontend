import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authentication from '../../redux/Actions/login.actions';
import bckimg from '../../Assets/images/login.svg';

export class Login extends React.Component {
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
		const { authentication } = this.props;
		const { email, password } = this.state;
		const data = {
			email,
			password,
		};
		authentication(data);
	};

	render() {
		const { password, email } = this.state;
		const { error, isLoggedIn } = this.props.user;
		const loginDisplay = (
			<div className='d-flex'>
				<img className='vh-100 vw-100 bg-img' src={bckimg} alt='bg' />
				<div className='container signup'>
					<div className='row'>
						<div className='col-md-6 col-lg-6 bg-sm-white rounded'>
							<h3 className='text-center mb-4'> Login </h3>
							<hr />
							{error && <p className='alert alert-danger'>{error}</p>}
							<form onSubmit={this.handleSubmit}>
								<div className='form-label-group mt-4'>
									<input
										type='email'
										name='email'
										className='form-control'
										onChange={this.handleInput}
										placeholder='Email'
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
									<Link to={`/password/reset`} activeClassName='active'>
										{' '}
										Forgot Password{' '}
									</Link>{' '}
								</p>
								<button className='btn btn-primary btn-block my-3' type='submit'>
									{'Sign in'}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
		const display = !isLoggedIn ? loginDisplay : <Redirect to='/dashboard'></Redirect>;
		return display;
	}
}

Login.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
	return {
		authentication: async data => dispatch(await authentication(data)),
	};
};

const mapStateToProps = ({ loginProp }) => ({
	user: loginProp,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
