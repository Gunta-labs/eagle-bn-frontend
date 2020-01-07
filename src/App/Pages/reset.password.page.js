import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendResetPassword } from '../../Redux/Actions/reset.password.action';

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showMessage = this.showMessage.bind(this);
		this.handleChangeF = this.handleChangeF.bind(this);
		this.handleChangeS = this.handleChangeS.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		const { password, confirmPassword } = this.state;
		this.props.sendResetPassword({ password, confirmPassword }, this.props.match.params.token);
	}
	handleChangeF(event) {
		this.setState({
			password: event.target.value,
		});
	}
	handleChangeS(event) {
		this.setState({
			confirmPassword: event.target.value,
		});
	}
	showMessage() {
		const { resetPasswordStatus } = this.props;
		if (resetPasswordStatus === 'not_started') {
			return <br />;
		}
		if (resetPasswordStatus === 'unmatch') {
			return (
				<div className='alert alert-info' role='alert'>
					passwords provided must be the same
				</div>
			);
		}
		if (resetPasswordStatus === 'pending') {
			return <div className='spinner-border text-primary'> </div>;
		}
		if (resetPasswordStatus === 'success') {
			return (
				<div className='alert alert-success' role='alert'>
					your password was updated successfully
				</div>
			);
		}
		if (resetPasswordStatus === 'failed') {
			return (
				<div className='alert alert-warning' role='alert'>
					Please check your link or check if your password contains letters, numbers, 8 minimum
					characters, and at least 1 special character
				</div>
			);
		}
		return (
			<div className='alert alert-danger' role='alert'>
				Something went wrong! please try again later.
			</div>
		);
	}
	render() {
		document.title = 'Barefoot || reset-password';
		return (
			<div className='d-flex flex-wrap align-content-center justify-content-center w-100 mainContainer'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 col-lg-6 mx-auto text-center'>
							<p className='text-secondary'> Change Password </p>
							<hr />
							<br />
							{this.showMessage()}
							{this.props.resetPasswordStatus !== 'success' ? (
								<form className='form' onSubmit={this.handleSubmit}>
									<input
										type='password'
										placeholder='New Password'
										className='form-control'
										name='password'
										onChange={this.handleChangeF}
										autoComplete='off'
									/>
									<br />
									<input
										type='password'
										placeholder='Confirm Password'
										className='form-control'
										name='confirmPassword'
										onChange={this.handleChangeS}
										autoComplete='off'
									/>
									<input
										type='submit'
										id='submit'
										value='send'
										className='btn btn-primary px-4 w-100 mt-4'
									/>
								</form>
							) : (
								<a className='btn btn-primary px-4 w-100 mt-4' href='/login'>
									Go to Login
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ResetPassword.propTypes = {
	resetPasswordStatus: propTypes.string,
	sendResetPassword: propTypes.func,
};

const mapStateToProps = props => {
	return {
		resetPasswordStatus: props.ResetPasswordReducer.resetPasswordStatus,
	};
};

export default connect(mapStateToProps, { sendResetPassword })(ResetPassword);
