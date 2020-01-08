import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../Redux/Actions';
import Header from '../Components/Header';

export class Signup extends React.Component {
	state = {
		fullname: '',
		email: '',
		password: '',
		confirmPassword: '',
		gender: '',
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const user = {
			fullname: this.state.fullname,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
		};
		this.props.loading();
		this.props.signup(user);
	};

	render() {
		const { user, error, signing } = this.props.props_.signup;
		document.title = 'Barefoot || signup';
		return (
			<div className='d-flex auth-bg'>
				<Header />
				<div className='container signup vh-100'>
					<div className={user && user.status === 201 ? 'row mt-20' : 'row'}>
						<div className='col-md-6 col-lg-6 bg-sm-white rounded'>
							<h3 className='text-center mb-4'>
								{user && user.status === 201 ? 'Success' : 'Register'}
							</h3>
							{user && user.status === 201 && (
								<div className='alert alert-success text-center' role='alert'>
									{user.data.msg}!
									<br />
									Please check you email ({user.data.data.email}) to verify you account
								</div>
							)}
							{error && (
								<div className='alert alert-danger text-center' role='alert'>
									{error}
								</div>
							)}
							<hr />
							<form
								className={user && user.status === 201 && 'd-none'}
								onSubmit={this.handleSubmit}
							>
								<div className='form-label-group mt-4'>
									<input
										type='text'
										name='fullname'
										className='form-control'
										onChange={this.handleChange}
										placeholder='fullname'
										required={true}
									/>
								</div>
								<div className='form-label-group mt-4'>
									<input
										type='email'
										name='email'
										className='form-control'
										onChange={this.handleChange}
										placeholder='Email address'
										required={true}
									/>
								</div>
								<div className='form-label-group mt-4'>
									<input
										type='password'
										name='password'
										className='form-control'
										onChange={this.handleChange}
										placeholder='Password'
										required={true}
									/>
								</div>
								<div className='form-label-group mt-4'>
									<input
										type='password'
										name='confirmPassword'
										className='form-control'
										onChange={this.handleChange}
										placeholder='confirm Password'
										required={true}
									/>
								</div>
								<button className='btn btn-primary btn-block my-3' type='submit'>
									{signing ? 'signing......' : 'Sign up'}
								</button>
								If you have a Barefoot account,
								<Link to={`/login`} activeClassName='active'>
									{' '}
									login here{' '}
								</Link>{' '}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		props_: state,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		loading: () =>
			dispatch({
				type: 'SIGNUP_PENDING',
				signing: true,
			}),
		signup: async user => dispatch(await signup(user)),
	};
};
const SignUp = connect(mapStateToProps, mapDispatchToProps)(Signup);

export { SignUp, mapStateToProps, mapDispatchToProps };
