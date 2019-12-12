import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import _ from 'lodash';
import moment from 'moment';
import { retrieveUserData, updateUserProfile } from '../../Redux/Actions/userProfile.action';
//import { } from '@fortawesome/react-fontawesome';

export class UserProfile extends React.Component {
	schema = {
		fullname: Joi.string().min(3),
		email: Joi.string().min(3),
		address: Joi.string().min(3),
		department: Joi.string().min(3),
	};

	static propTypes = {
		ViewUserInfo: PropTypes.func.isRequired,
		user: PropTypes.shape({ root: PropTypes.string }).isRequired,
	};
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false,
			isLoad: true,
			isUpdate: false,
			errors: {},
			id: '',
			fullname: '',
			email: '',
			phone: '',
			role: 1,
			gender: null,
			dob: null,
			address: '',
			city: '',
			state: '',
			department: '',
			line_manager: '',
			avatar: '',
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount() {
		const { ViewUserInfo } = this.props;
		ViewUserInfo();
	}

	validateProperty = (id, value) => {
		const obj = { [id]: value };
		const schema = { [id]: this.schema[id] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};
	changeEditMode = () => {
		const { isEdit } = this.state;
		this.setState({ isEdit: !isEdit });
	};

	handleInput(event) {
		const { target } = event;
		const { errors } = this.state;
		const { id } = target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const err = this.validateProperty(id, value);
		if (err) errors[id] = err;
		else delete errors[id];
		this.setState({
			[id]: value,
			errors,
		});
	}

	parseError = err => {
		if (!_.isEmpty(err)) {
			if (err.error) {
				return err.error;
			}
			if (err && _.isArray(err.errors)) return err.errors[0];
			return err.errors.message;
		}
		return null;
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { user, status, error } = nextProps;
		if (status) {
			const err = this.parseError(error);
			if (err === 'Invalid token specified') {
				window.location.assign('/login');
			}
			switch (status) {
				case 'retrieve_success':
					this.setState({ isLoad: false });
					break;
				case 'retrieve_fail':
					toast.error(err);
					break;
				case 'update_success':
					this.setState({ isUpdate: false, isEdit: false });
					toast.success('updated profile successfully!');
					break;
				case 'update_fail':
					this.setState({ isUpdate: false });
					toast.error(err);
					break;
				default:
					break;
			}
		}
		this.setState({ ...user });
	}

	handleEdit() {
		this.setState({ isUpdate: true });
		const { UdateUserInfo } = this.props;
		const {
			id,
			fullname,
			email,
			gender,
			dob,
			address,
			city,
			state,
			department,
			line_manager,
			avatar,
		} = this.state;
		const userDataForm = new FormData();
		userDataForm.append('id', id);
		userDataForm.append('fullname', fullname);
		userDataForm.append('gender', gender);
		userDataForm.append('dob', dob);
		userDataForm.append('address', address);
		userDataForm.append('city', city);
		userDataForm.append('state', state);
		userDataForm.append('email', email);
		userDataForm.append('department', department);
		userDataForm.append('line_manager', line_manager);
		//console.log(userDataForm.dob);
		UdateUserInfo(userDataForm);
	}
	render() {
		const {
			id,
			fullname,
			email,
			gender,
			dob,
			address,
			city,
			state,
			department,
			line_manager,
			avatar,
			errors,
		} = this.state;
		return (
			<div className='request-container bg-light rounded border mb-5'>
				<div className='mt-5 pl-4 mb-5'>
					<h5 className=' request-container text-primary border mybody pt-3 pl-3 bg-white'>
						{' '}
						My account{' '}
					</h5>
					<div className='container'>
						<div className='container mt-5 ml-5'>
							<input
								type='submit'
								className='btn btn-link col-xs-3 border rounded-0'
								value='Account info'
								onClick={this.changeEditMode}
							/>
							<input
								type='submit'
								className='btn btn-link col-xs-3 border rounded-0 ml-2'
								value='Edit account'
								onClick={this.changeEditMode}
							/>
							<div className='container border bg-white'>
								<form
									id='userDataForm'
									onSubmit={this.handleUpdate}
									className='container mt-5 width70'
								>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>User ID</span>
										</div>
										<input
											type='number'
											className='width70'
											placeholder='User Id'
											id='id'
											onChange={this.handleInput}
											value={id}
											access={this.isEdit}
											error={errors.id}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Full name</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='Full name'
											id='fullname'
											onChange={this.handleInput}
											value={fullname}
											access={this.isEdit}
											error={errors.fullname}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Email</span>
										</div>
										<input
											type='email'
											className='width70'
											placeholder='Email'
											id='email'
											onChange={this.handleInput}
											value={email}
											access={this.isEdit}
											error={errors.emal}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Gender</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='Gender'
											id='gender'
											onChange={this.handleInput}
											value={gender}
											access={this.isEdit}
											error={errors.gender}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Date of birth</span>
										</div>
										<input
											type='date'
											className='width70 text-muted'
											placeholder={moment}
											id='dob'
											value={dob}
											access={this.isEdit}
											error={errors.dob}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Address</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='Address'
											id='address'
											onChange={this.handleInput}
											value={address}
											access={this.isEdit}
											error={errors.address}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>City</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='City'
											id='city'
											onChange={this.handleInput}
											value={city}
											access={this.isEdit}
											error={errors.city}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>State</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='State'
											id='state'
											onChange={this.handleInput}
											value={state}
											access={this.isEdit}
											error={errors.state}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Department</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='Department'
											id='department'
											onChange={this.handleInput}
											value={department}
											error={errors.department}
										></input>
									</div>
									<div className='input-group mb-3'>
										<div className='form-control input-group-prepend'>
											<span className='rounded-0 text-primary'>Line manager</span>
										</div>
										<input
											type='text'
											className='width70'
											placeholder='Line manager'
											id='line_manger'
											onChange={this.handleInput}
											value={line_manager}
											error={errors.line_manager}
										></input>
									</div>
									<div>
										{/* {this.isEdit ? ( */}
										<div className='mt-5 mb-5'>
											<span
												className='btn btn-primary mr-5'
												onClick={this.changeEditMode}
												role='button'
											>
												Cancel
											</span>
											<span
												className='btn btn-primary ml-5'
												id='btn_update'
												onClick={this.handleEdit}
												role='button'
											>
												Update profile
												{(this.isUpdate = true)}
											</span>
										</div>
										{/* ) : null} */}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ profile }) => ({
	user: profile.user,
	error: profile.error,
	status: profile.status,
});
const mapDispatchToProps = dispatch => ({
	ViewUserInfo: () => dispatch(retrieveUserData()),
	UdateUserInfo: data => dispatch(updateUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
