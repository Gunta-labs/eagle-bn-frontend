import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import constants from '../../Redux/constants';
import LogoutAction from '../../Redux/Actions/logout.action';
import { connect } from 'react-redux';

class Logout extends React.Component {
	logout = () => {
		let token = localStorage.getItem('barefoot_token');
		this.props.inits();
		this.props.logout(token);
	};
	render() {
		const { payload, pending } = this.props;
		if (payload && payload.status === 200) {
			localStorage.removeItem('barefoot_token');
			window.location.reload();
		}
		return (
			<button className='nav-link btn btn-primary btn-sm px-4' onClick={() => this.logout()}>
				{pending ? (
					<span
						className='spinner-border spinner-border-sm mr-2'
						role='status'
						aria-hidden='true'
					></span>
				) : (
					<FontAwesomeIcon icon={faSignOutAlt} />
				)}
				{pending ? 'loging out...' : 'logout'}
			</button>
		);
	}
}

const mapStateToProps = state => ({
	payload: state.Logout.payload,
	pending: state.Logout.pending,
});
const mapDispatchToProps = dispatch => {
	return {
		inits: () =>
			dispatch({
				type: constants.LOGOUT_PENDING,
				pending: true,
			}),
		logout: async token => dispatch(await LogoutAction(token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
