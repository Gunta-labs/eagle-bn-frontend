import React from 'react';
import { shallow } from '../../__mocks__/enzyme/enzymes';
import PlacesCard from '../../App/Components/DestinCard';
import Card from '../../App/Components/TripCard';
import Data from '../../__mocks__/data/landing.mock';

const renderPlacesCard = () => {
	const { data } = Data;
	return shallow(<PlacesCard data={data} />);
};
const renderCard = () => {
	const { data } = Data;
	return shallow(<Card data={data} />);
};

describe('should test landing componets', () => {
	it('Should test places component', () => {
		const initialProps = {
			stats: {
				payload: {
					status: 200,
					message: 'Destinations Travelled',
					data: {
						AccommodationImages: [{ imageurl: 'test' }],
					},
				},
			},
			accs: {
				payload: {
					status: 200,
					message: 'Destinations Travelled',
					data: {},
				},
			},
			map: jest.fn(),
			pending: jest.fn(),
			loading: jest.fn(),
		};
		const wrapper = renderPlacesCard(initialProps);
		expect(wrapper.find('.card')).toExist();
		expect(wrapper.find('.col-md-3')).toExist();
	});
	it('Should test accomodation card', () => {
		const initialProps = {
			stats: {
				stats: {
					payload: {
						status: 200,
						message: 'Destinations Travelled',
						data: {},
					},
				},
			},
			map: jest.fn(),
			pending: jest.fn(),
			payload: {},
		};
		const wrapper = renderCard(initialProps);
		expect(wrapper.find('.card')).toExist();
		expect(wrapper.find('.col-md-3')).toExist();
	});
});
