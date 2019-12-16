import React from 'react';
import Header from '../Components/Header';

function dashboard() {
	return (
		<div className='d-flex'>
			<Header active_menu={0} showSideNav={true} />
		</div>
	);
}

export default dashboard;
