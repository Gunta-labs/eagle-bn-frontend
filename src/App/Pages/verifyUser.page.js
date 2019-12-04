import React from 'react';
import { connect } from 'react-redux';
import verifyUser from '../../Redux/Actions/verify.action';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import '../../scss/style.scss';

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			verifyUser,
		},
		dispatch,
	);

const mapStateToProps = state => ({
	verifyResult: state.Verify.verifyResult,
	pending: state.Verify.pending,
	error: state.Verify.error,
});

class VerifyUser extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const { token } = this.props.match.params;
		this.props.verifyUser(token);
	}
	render() {
		const { verifyResult, error, pending } = this.props;
		console.log(verifyResult, error, pending);
		return (
			<div className='d-flex flex-wrap align-content-center justify-content-center w-100 mainContainer'>
				{' '}
				<div>
					<h2 className={`${!error ? 'text-secondary' : 'text-danger'} d-block text-center`}>
						{verifyResult !== null ? 'Account verified!' : ''}{' '}
						{pending ? 'Account verification ...' : ''} {error ? 'Account verification failed' : ''}{' '}
					</h2>{' '}
					<p className='text-secondary d-block mx-2'>
						{verifyResult &&
							'Thanks, we’ ve been able to verity your the email address linked to your account'}
						{error && 'Please verify if the link you provided is correct'}
						{pending && 'Please wait while we are verifying you account'}
					</p>{' '}
					{verifyResult && (
						<div className='col text-center'>
							<button className='btn btn-primary px-5 '>Go to login </button>
						</div>
					)}{' '}
					<div className='col text-center'>
						{pending && <div className='spinner-border text-primary '> </div>}{' '}
					</div>
				</div>{' '}
			</div>
		);
	}
}

VerifyUser.propTypes = {
	pending: PropTypes.bool,
	verifyResult: PropTypes.object,
	error: PropTypes.object,
	verifyUser: PropTypes.func,
	token: PropTypes.string,
};

const Verify = connect(mapStateToProps, mapDispatchToProps)(VerifyUser);
export default Verify;
