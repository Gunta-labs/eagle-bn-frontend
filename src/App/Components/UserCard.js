import React from 'react';
import AccomImg from '../../Assets/images/acc.jpg';

function UserCard({ data, showModel }) {
	return data.map(e => {
		return (
			<div className='col-md-3 col-sm-6'>
				<div className='card shadow-sm bg-white'>
					<div className='list-group-flush'>
						<div className='list-group'>
							<div className='d-flex justify-content-between'>
								<div className='text-center'>
									<img className=' avatar mb-3 mt-3 middle' src={e.avatar || AccomImg} alt='user' />
								</div>
							</div>
							<div class='text-center'>
								<span className='bg-white text-primary'>Name: {e.fullname || e.email}</span>
							</div>
						</div>
						<div className='ml-3 mr-3 mt-3 border border-left-0 border-right-0 border-bottom-0 text-center'>
							<div className='mt-2 mb-2'>
								<span className='text-center'>Role: {e.Role.roleName}</span>
							</div>
						</div>
						<div className='ml-3 mr-3 border border-left-0 border-right-0 border-bottom-0 text-center'>
							<div className='mt-3 mb-3'>
								<span>
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
