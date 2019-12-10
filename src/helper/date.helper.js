const getFormatedDate = date => {
	try {
		const diffTime = new Date().getTime() - date.getTime();
		const diffDays = Math.round(Math.abs(diffTime) / (1000 * 60 * 60 * 24), 10);
		if (diffDays === 0) return 'Today';
		return diffTime > 0 ? `${diffDays} day(s) ago` : `In ${diffDays} day(s)`;
	} catch {
		return 'Not specified';
	}
};

export default getFormatedDate;
