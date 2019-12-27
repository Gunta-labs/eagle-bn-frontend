import React from 'react';
import AccomImg from '../../Assets/images/acc.jpg';

function UserCard({ data, showModel }) {
	return data.map(e => {
		return (
			<div className='col-12 col-sm-12 col-md-6 col-lg-3 mt-4'>
				<div className='card mt-1 ml-lg-2 mr-md-1'>
					<div className='list-group list-group-flush'>
						<div className='list-group-item'>
							<div className='d-flex justify-content-between'>
								<div className='text-center'>
									<img className='avatar mt-2 middle mb-5' src={e.avatar || AccomImg} alt='user' />
								</div>
							</div>
							<div class='text-center'>
								<span className='bg-white text-primary'>Name: {e.fullname || e.email}</span>
							</div>
						</div>
						<div className='list-group-item text-center'>
							<div>
								<span className='text-center'>Role: {e.Role.roleName}</span>
							</div>
						</div>
						<div className='list-group-item'>
							<div className='d-flex justify-content-between ml-1 mr-1 mt-0'>
								<span className='ml-4'>
									<button
										id='displayCard'
										type='button'
										class='btn btn-primary'
										data-toggle='modal'
										data-target='#role'
										onClick={event => {
											event.preventDefault();
											showModel(e.email, e.Role);
										}}
									>
										Change user role
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});
}
export default UserCard;
