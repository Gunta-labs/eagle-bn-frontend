/* eslint-disable no-loop-func */
import locations from 'countrycitystatejson';

const getAllCountry = () => {
	return locations.getCountries();
};
const getCountryByName = country => {
	const lowerCountry = country ? country.toLowerCase() : '';
	return locations.getCountries().find(c => c.name.toLowerCase() === lowerCountry);
};
const getCountryCities = countryName => {
	if (!countryName) return [];
	const c = getCountryByName(countryName);
	if (!c) return [];
	const countryShort = c.shortName;
	if (countryShort) {
		const country = locations.getCountryByShort(countryShort);
		const cities = [];
		for (const key in country.states) {
			country.states[key].forEach(e => {
				cities.push(e);
			});
		}
		return cities;
	}
	return [];
};
export default {
	getAllCountry,
	getCountryCities,
};
