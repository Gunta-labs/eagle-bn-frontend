import React from 'react';

export default (aRStatus, closeModal, apprOrRej) => {
	const { type, index, status } = aRStatus;
	return (
		<div className='dialog'>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='exampleModalLabel'>
							{type} trip request
						</h5>
					</div>
					<div className='modal-body'>This action is not reversable</div>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' onClick={closeModal}>
							Close
						</button>
						<button
							type='button'
							className={type === 'approve' ? 'btn btn-primary' : 'btn btn-danger'}
							onClick={e => {
								e.preventDefault();
								if (status !== 'pending') apprOrRej(type, index);
							}}
						>
							{status === 'pending' ? <div className='spinner-border text-primary'></div> : type}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
