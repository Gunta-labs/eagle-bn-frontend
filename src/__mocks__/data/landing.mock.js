export const data = {
	status: 200,
	msg: 'Destinations Travelled',
	data: [
		{ country: 'NG', city: 'lagos', 'N of visitors': '2' },
		{ country: 'UG', city: 'Kampala', 'N of visitors': '1' },
		{ country: 'KE', city: 'Nairobi', 'N of visitors': '1' },
	],
};
export const accData = {
	status: 200,
	msg: 'Accommodations facilities',
	data: [
		{
			id: 2,
			userid: 1,
			name: 'hotel',
			description: 'the first hotel in region',
			address: 'kigali',
			availableSpace: 'rooms and pool',
			cost: 200000,
			services: 'wifi, breakfast',
		},
	],
};

export default data;
