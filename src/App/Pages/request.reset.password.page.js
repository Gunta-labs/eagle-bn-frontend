import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendRequestReset } from '../../Redux/Actions/reset.password.action';

class RequestResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showMessage = this.showMessage.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		const { email } = this.state;
		this.props.sendRequestReset({ email });
	}
	changeHandler(event) {
		this.setState({ email: event.target.value });
	}
	showMessage() {
		const { requestResetStatus } = this.props;
		if (requestResetStatus === 'not_started') {
			return <br />;
		}
		if (requestResetStatus === 'pending') {
			return <div className='spinner-border text-primary '> </div>;
		}
		if (requestResetStatus === 'success') {
			return (
				<div className='alert alert-success' role='alert'>
					{`password reset instructions sent to ${this.state.email}`}
				</div>
			);
		}
		if (requestResetStatus === 'failed') {
			return (
				<div className='alert alert-warning' role='alert'>
					The email is invalid or not registered
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
		return (
			<div className='d-flex flex-wrap align-content-center justify-content-center w-100 mainContainer'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 col-lg-6 mx-auto text-center'>
							<p className='text-secondary'> Reset Password Request </p>
							<hr />
							<br />
							{this.showMessage()}
							{this.props.requestResetStatus !== 'success' ? (
								<form className='form' onSubmit={this.handleSubmit}>
									<input
										type='email'
										placeholder='Your Email Address'
										className='form-control'
										name='email'
										onChange={this.changeHandler}
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
								''
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

RequestResetPassword.propTypes = {
	requestResetStatus: propTypes.string,
	sendRequestReset: propTypes.func,
};

const mapStateToProps = props => {
	return {
		requestResetStatus: props.ResetPasswordReducer.requestResetStatus,
	};
};

export default connect(mapStateToProps, { sendRequestReset })(RequestResetPassword);
