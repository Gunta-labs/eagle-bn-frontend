const getStatus = status => {
	let statusClass = '';
	if (status === 'pending') statusClass = 'btn-warning';
	else if (status === 'approved') statusClass = 'btn-success';
	else statusClass = 'btn-danger';
	return statusClass;
};

export default getStatus;
