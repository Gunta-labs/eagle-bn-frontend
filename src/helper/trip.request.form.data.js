export default values => {
	const { city, country, returnTime, timeZone } = values;
	const data = { city, country, returnTime, timeZone };
	const trips = [];
	const tripLength = Object.keys(values).filter(element => /^city.+$/.test(element)).length;
	for (let count = 0; count < tripLength; count++) {
		trips[count] = {};
		trips[count].city = values[`city-${count}`];
		trips[count].country = values[`country-${count}`];
		trips[count].reason = values[`reason-${count}`];
		trips[count].departureTime = values[`departureTime-${count}`];
	}
	data.trips = trips;
	return data;
};
