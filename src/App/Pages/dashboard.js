import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { retrieveUserData, updateUserProfile } from '../../Redux/Actions/dashboard.action';

export class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReadOnly: true,
			isLoad: true,
			isUpdate: false,
			error: '',
			alert: '',
			id: '',
			fullname: '',
			email: '',
			phone: undefined,
			role: 1,
			gender: '',
			address: ' ',
			city: '',
			state: '',
			department: '',
			line_manager: '',
			avatar: '',
			uploadedPic: '',
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.changeEditMode = this.changeEditMode.bind(this);
	}

	componentDidMount() {
		this.setState({ error: '' });
		const { ViewUserInfo } = this.props;
		ViewUserInfo();
	}

	changeEditMode = event => {
		const { target } = event;
		if (target.value === 'Edit account') {
			this.setState({ isReadOnly: false });
		} else {
			this.setState({ isReadOnly: true });
			this.componentDidMount();
		}
	};

	handleInput(event) {
		event.preventDefault();
		const { target } = event;
		const { value, maxLength } = event.target;
		value.slice(0, maxLength);

		const { id } = target;
		if (id === 'avatar') {
			this.setState({
				avatar: event.target.files[0],
				uploadedPic: `${event.target.files.length} picture `,
			});
		} else {
			this.setState({
				[target.id]: target.value,
			});
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { error, user } = nextProps;
		if (error) {
			if (error === 'Invalid token specified') {
				window.location.assign('/login');
			}
		}
		this.setState({ ...user });
	}

	handleEdit() {
		this.props.initialize();
		this.setState({ isUpdate: true });
		const { UdateUserInfo } = this.props;
		const {
			id,
			fullname,
			email,
			phone,
			gender,
			address,
			city,
			state,
			department,
			line_manager,
			avatar,
		} = this.state;
		this.setState({ error: '' });
		const userDataForm = new FormData();
		userDataForm.append('id', id);
		userDataForm.append('fullname', fullname);
		userDataForm.append('phone', phone);
		userDataForm.append('gender', gender);
		userDataForm.append('address', address);
		userDataForm.append('city', city);
		userDataForm.append('state', state);
		userDataForm.append('email', email);
		userDataForm.append('department', department);
		userDataForm.append('line_manager', line_manager);
		userDataForm.append('avatar', avatar);
		if (fullname === '') return this.setState({ error: 'Fullname is required' });
		if (gender === '') return this.setState({ error: 'Select gender' });
		if (phone === '' || phone.length < 10) return this.setState({ error: 'Invalid phone number' });
		UdateUserInfo(userDataForm);
	}
	render() {
		const {
			id,
			fullname,
			email,
			phone,
			gender,
			address,
			state,
			city,
			department,
			line_manager,
			avatar,
			isReadOnly,
			uploadedPic,
			error,
		} = this.state;
		return (
			<div className='user-container container'>
				<Header showSideNav={true} active_menu={0} avatar={avatar} />

				<h5 className=' text-primary border containerbody pl-3 pt-1 bg-white'> My account </h5>
				<div className=''>
					<div className='sub-container mt-5'>
						<input
							type='submit'
							id='myinfo'
							className='btn btn-link col-xs-3 border rounded-0'
							value='Account info'
							onClick={this.changeEditMode}
						/>
						<input
							type='submit'
							id='editinfo'
							className='btn btn-link col-xs-3 border rounded-0 ml-2'
							value='Edit account'
							onClick={this.changeEditMode}
						/>
						<div className='container border bg-white'>
							<form id='userDataForm' onSubmit={this.handleUpdate} className='formData mt-5'>
								{!error && <div className={this.props.alert}> {this.props.status}</div>}
								{error && (
									<p name='response' className='alert alert-danger text-center'>
										{error}
									</p>
								)}
								<br />
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text text-primary inputlabel' id='lid'>
											User ID
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='lid'
										id='id'
										onChange={this.handleInput}
										value={id}
										readOnly={true}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='fn'>
											Full name
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='fn'
										id='fullname'
										onChange={this.handleInput}
										value={fullname}
										readOnly={isReadOnly}
										required={true}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='em'>
											Email
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='em'
										id='email'
										onChange={this.handleInput}
										value={email}
										readOnly={true}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='tel'>
											Telephone
										</span>
									</div>
									<input
										type='telephone'
										className='form-control'
										aria-describedby='tel'
										id='phone'
										onChange={this.handleInput}
										value={phone}
										readOnly={isReadOnly}
										maxLength='10'
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<label className='input-group-text inputlabel'>Gender</label>
									</div>
									<select
										type='select'
										className='custom-select'
										id='gender'
										onChange={this.handleInput}
										value={gender}
										readOnly={isReadOnly}
									>
										<option defaultValue=' '></option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
									</select>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='add'>
											Address
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='add'
										id='address'
										onChange={this.handleInput}
										value={address}
										readOnly={isReadOnly}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='ci'>
											City
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='ci'
										id='city'
										onChange={this.handleInput}
										value={city}
										readOnly={isReadOnly}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='st'>
											State
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='st'
										id='state'
										onChange={this.handleInput}
										value={state}
										readOnly={isReadOnly}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='dep'>
											Department
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='dep'
										id='department'
										onChange={this.handleInput}
										value={department}
										readOnly={true}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel' id='lm'>
											Line Manager
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										aria-describedby='lm'
										id='line_manger'
										onChange={this.handleInput}
										value={line_manager}
										readOnly={true}
									/>
								</div>
								<div className='input-group mb-3'>
									<div className='input-group-prepend'>
										<span className='input-group-text inputlabel'>Upload picture</span>
									</div>
									<div className='custom-file'>
										<input
											type='file'
											className='custom-file-input'
											id='avatar'
											multiple={false}
											onChange={this.handleInput}
										/>
										<label className='custom-file-label' for='avatar'>
											{uploadedPic || 'choose picture'}
										</label>
									</div>
								</div>
								<div className='mt-5 mb-5'>
									<span
										id='cancel'
										className='btn btn-primary mr-5'
										onClick={this.changeEditMode}
										role='button'
										hidden={isReadOnly}
									>
										Discard changes
									</span>
									<span
										className='btn btn-primary'
										id='btn_update'
										onClick={this.handleEdit}
										role='button'
										hidden={isReadOnly}
									>
										Update profile
										{(this.isUpdate = true)}
									</span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
UserProfile.propTypes = {
	profile: PropTypes.object,
};

const mapStateToProps = props => ({
	user: props.profile.user,
	error: props.profile.error,
	status: props.profile.status,
	alert: props.profile.alert,
});
export const mapDispatchToProps = dispatch => ({
	ViewUserInfo: () => dispatch(retrieveUserData()),
	UdateUserInfo: data => dispatch(updateUserProfile(data)),
	initialize: () =>
		dispatch({
			type: '',
			status: 'Account profile',
		}),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
