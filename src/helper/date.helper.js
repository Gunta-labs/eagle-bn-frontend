import moment from 'moment';

const getFormatedDate = date => {
	const time = moment(date, 'YYYYMMDD').fromNow();
	return time !== 'Invalid date' ? time : 'Not specified';
};

export default getFormatedDate;
