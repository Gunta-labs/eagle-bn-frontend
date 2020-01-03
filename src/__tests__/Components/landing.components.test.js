import React from 'react';
import { shallow } from '../../__mocks__/enzyme/enzymes';
import PlacesCard from '../../App/Components/DestinCard';
import Card from '../../App/Components/TripCard';
import Data from '../../__mocks__/data/landing.mock';
import helper from '../../helper/test.helper';
import headerData from '../../__mocks__/data/header.data';

const renderCard = () => {
	const { data } = Data;
	return shallow(<Card data={data} />);
};

describe('should test landing componets', () => {
	it('Should test places component', () => {
		const { data } = Data;
		const store = helper.mockStore(headerData.mockData.successState);
		const wrapper = helper.mountNewWrapper(store, <PlacesCard data={data} />);
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
