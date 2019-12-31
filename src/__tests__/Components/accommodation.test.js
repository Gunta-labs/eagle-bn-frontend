import React from 'react';
import Accomodations from '../../App/Components/Accomodations';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('axios');

configure({ adapter: new Adapter() });

const renderAccommodation = args => {
	const props = { ...args };
	return shallow(<Accomodations {...props} />);
};

describe('should test user role card component', () => {
	it('Should render', () => {
		const initialProps = {
			data: [
				{
					id: 4,
					name: 'best hotel',
					address: 'kigali',
					AccommodationImages: [],
				},
			],
		};

		const wrapper = renderAccommodation(initialProps);
		expect(wrapper).toHaveLength(1);
	});
});
