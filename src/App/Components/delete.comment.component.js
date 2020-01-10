import React from 'react';

export default props => {
	const { close, trash, id, commentId } = props;
	return (
		<div className='dialog'>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='exampleModalLabel'>
							Delete Comment
						</h5>
					</div>
					<div className='modal-body'>Are you sure you want to delete this comment ?</div>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' onClick={close}>
							Close
						</button>
						<button
							type='button'
							className={'btn btn-danger'}
							onClick={e => {
								e.preventDefault();
								props.load();
								trash(id, parseInt(commentId));
							}}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
