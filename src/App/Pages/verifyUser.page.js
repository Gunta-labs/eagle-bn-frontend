import React from 'react';
import { connect } from 'react-redux';
import verifyUser from '../../Redux/Actions/verify.action';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../Assets/scss/style.scss';
import constants from '../../Redux/constants';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const mapStateToProps = state => ({
	payload: state.Verify.payload,
	pending: state.Verify.pending,
	error: state.Verify.error,
});
const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.VERIFY_PENDING,
				pending: true,
			}),
		verifyUser: async token => dispatch(await verifyUser(token)),
	};
};
class VerifyUser extends React.Component {
	componentDidMount() {
		const { token } = this.props.match.params;
		this.props.initialize();
		this.props.verifyUser(token);
	}
	getTextToDisplay(payload, error, pending) {
		if (payload)
			return {
				title: 'Account verified!',
				description: 'Thanks, we’ve been able to verity the email address linked to your account',
			};
		if (pending)
			return {
				title: 'Account verification ...',
				description: 'Please wait while we are verifying you account',
			};
		if (error)
			return {
				title: 'Account verification failed',
				description:
					"We've not been able to verify your account. Make sure you're providing a correct link then reload this page",
			};
		return { title: '', description: '' };
	}
	render() {
		const { payload, error, pending } = this.props;
		const { title, description } = this.getTextToDisplay(payload, error, pending);
		return (
			<div>
				<Header />
				<div className='d-flex flex-wrap align-content-center justify-content-center w-100 mainContainer'>
					<div>
						<h2
							className={`${!error ? 'text-secondary' : 'text-danger error'} d-block text-center`}
						>
							{title}
						</h2>
						<p className='text-secondary d-block mx-2 text-center'>{description}</p>
						{payload && (
							<div className='col text-center'>
								<Link to='/login' className='btn btn-primary px-5 '>
									{' '}
									Go to login{' '}
								</Link>
							</div>
						)}
						<div className='col text-center'>
							{pending && <div className='spinner-border text-primary '> </div>}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

VerifyUser.propTypes = {
	pending: PropTypes.bool,
	payload: PropTypes.object,
	error: PropTypes.object,
	verifyUser: PropTypes.func,
	token: PropTypes.string,
};

const Verify = connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
export default Verify;
