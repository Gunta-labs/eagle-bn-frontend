export default values => {
	const { city, country, returnTime, timeZone } = values;
	const data = { city, country, returnTime, timeZone };
	if (returnTime) data.returnTime = new Date(returnTime).toLocaleString().replace(',', '');
	const trips = [];
	const tripLength = Object.keys(values).filter(element => /^city.+$/.test(element)).length;
	for (let count = 0; count < tripLength; count++) {
		trips[count] = {};
		trips[count].city = values[`city-${count}`];
		trips[count].country = values[`country-${count}`];
		trips[count].reason = values[`reason-${count}`];
		trips[count].departureTime = new Date(values[`departureTime-${count}`])
			.toLocaleString()
			.replace(',', '');
	}
	data.trips = trips;
	return data;
};
