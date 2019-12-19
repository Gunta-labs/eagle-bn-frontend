import React from 'react';

export default (closeModel, changeRoleStatus, email, Role, error, changeRole) => {
	let roleValue = Role.roleValue;
	return (
		<div className='dialog'>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5>Are you sure you need to change a user role?</h5>
					</div>
					<div className='modal-body'>
						{changeRoleStatus === 'failed' && (
							<h5 className='alert alert-warning'> {changeRoleStatus === 'failed' ? error : ''}</h5>
						)}
						<h6 className='modal-title mb-4'>Current role: {Role.roleName}</h6>
						<h6 className='modal-title'>Select new role</h6>
						<select
							type='select'
							className='custom-select'
							id='role'
							onChange={e => {
								e.preventDefault();
								roleValue = e.target.value;
							}}
						>
							<option defaultValue={Role.roleValue}>{Role.roleName}</option>
							<option value='host'>host</option>
							<option value='admin'>System administrator</option>
							<option value='Tadmin'>Travel admin</option>
							<option value='requester'>requester</option>
							<option value='manager'>manager</option>
						</select>
					</div>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' onClick={closeModel}>
							Cancel
						</button>
						<button
							type='button'
							class='btn btn-primary'
							onClick={e => {
								e.preventDefault();
								changeRole(email, roleValue);
							}}
						>
							{changeRoleStatus === 'pending' ? (
								<div className='spinner-border text-primary'></div>
							) : (
								'Apply new role'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
