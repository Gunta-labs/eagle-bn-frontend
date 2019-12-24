import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCard from '../Components/UserCard';
import Header from '../Components/Header';
import { getAllUsers, changeModelStatus } from '../../Redux/Actions/user.role.action.js';
import * as checkTock from '../../helper/helper';
import ModelPreview from '../Components/admin.role';
import Apis from '../../Api/';

class UserRole extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			Role: '',
			data: '',
			error: '',
		};

		this.changeRole = this.changeRole.bind(this);
		this.showModel = this.showModel.bind(this);
		this.closeModel = this.closeModel.bind(this);
	}

	async componentDidMount() {
		const { getUsers } = this.props;
		const res = await getUsers();
		this.setState({ data: res.payload });
	}
	async changeRole(email, role) {
		const { manageChangeRole } = this.props;
		try {
			manageChangeRole('pending');
			await Apis.changeRole(checkTock.token, { email, new_role: role });
			manageChangeRole('success');
		} catch (error) {
			this.setState({
				error: (error.response || { data: { msg: 'Something went wrong, tyr again' } }).data.msg,
			});
			manageChangeRole('failed');
		}
	}
	closeModel(e) {
		e.preventDefault();
		this.props.changeModelStatus('not_started');
	}
	showModel(email, Role) {
		const { manageChangeRole, changeModelStatus } = this.props;
		this.setState({ email: email, Role: Role, error: '' });
		manageChangeRole('not_started');
		changeModelStatus('started');
	}
	render() {
		const { data, email, Role, error } = this.state;
		const { modelStatus, changeRoleStatus } = this.props.userRole;
		return (
			<div>
				<div className='user-container container'>
					<Header active_menu={1} showSideNav={true} />

					<h5 className=' text-primary border containerbody pl-3 pt-1 bg-white'> Users </h5>
					<div className='row mt-5'>
						{data && <UserCard data={data} showModel={this.showModel} />}
					</div>
				</div>
				{modelStatus === 'started' &&
					ModelPreview(this.closeModel, changeRoleStatus, email, Role, error, this.changeRole)}
				{changeRoleStatus === 'success' && (window.location = '/admin')}
			</div>
		);
	}
}
UserRole.propTypes = {
	userRole: PropTypes.object,
};
export const mapStateToProps = ({ userRole }) => ({
	userRole,
});

export const mapDispatchToProps = dispatch => {
	return {
		getUsers: async data => dispatch(await getAllUsers(checkTock.token)),
		changeModelStatus: data => dispatch(changeModelStatus(data)),
		manageChangeRole: async data => dispatch({ type: 'change_role_status', payload: data }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRole);
