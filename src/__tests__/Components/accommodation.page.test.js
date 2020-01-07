import React from 'react';
import { GetAllAccomodations, mapDispatchToProps } from '../../App/Pages/accomodations';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('axios');

configure({ adapter: new Adapter() });

const renderAccommodations = args => {
	const props = { ...args };
	return shallow(<GetAllAccomodations {...props} />);
};

describe('should test user role card component', () => {
	it('Should render', () => {
		const initialProps = {
			state: {
				filter: 'all',
				inputType: 'text',
				filterText: '',
				hide: true,
			},
			data: [],
			getAccomodations: jest.fn(),
			handleText: jest.fn(),
			handleSelect: jest.fn(),
			preventDefault: jest.fn(),
			searchData: jest.fn(),
			accomodation: { data: jest.fn() },
		};

		const wrapper = renderAccommodations(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('Should successfully search an accommodation', () => {
		const event = { preventDefault: jest.fn() };
		const initialProps = {
			state: {
				filter: 'all',
				inputType: 'text',
				filterText: '',
				hide: true,
			},
			data: [],
			getAccomodations: jest.fn(),
			handleText: jest.fn(),
			handleSelect: jest.fn(),
			searchData: jest.fn(),
			accomodation: { data: jest.fn() },
			getAccomodationsByFilter: jest.fn(),
		};
		const wrapper = renderAccommodations(initialProps);
		wrapper.find('#search').simulate('click', event);
		const { filter } = wrapper.instance().state;
		expect(filter).toBe('all');
	});
	it('Should handle select option to select an accommodation', () => {
		const initialProps = {
			state: {
				filter: 'costLessOr',
				inputType: 'number',
				filterText: '',
				hide: false,
			},
			data: [],
			getAccomodations: jest.fn(),
			handleText: jest.fn(),
			handleSelect: jest.fn(),
			searchData: jest.fn(),
			accomodation: { data: jest.fn() },
			getAccomodationsByFilter: jest.fn(),
			componentDidMount: jest.fn(),
		};
		const wrapper = renderAccommodations(initialProps);
		wrapper.setState(initialProps.state);
		const changeFilter = wrapper.find('#filter');
		const filter = {
			preventDefault: jest.fn(),
			target: {
				id: 'filter',
				value: 'isAvailable=true',
			},
		};
		changeFilter.simulate('change', filter);
		wrapper.setState({ inputType: 'text', filterText: '', hide: true, filter: 'isAvailable=true' });
		const { hide } = wrapper.instance().state;
		expect(hide).toBe(true);
	});
	it('Should handle filter text change', () => {
		const initialProps = {
			state: {
				filter: 'costLessOr',
				filterValue: 4000,
				inputType: 'number',
				filterText: 'Enter the cost',
			},
			data: [],
			getAccomodations: jest.fn(),
			handleText: jest.fn(),
			handleSelect: jest.fn(),
			searchData: jest.fn(),
			accomodation: { data: jest.fn() },
			getAccomodationsByFilter: jest.fn(),
			componentDidMount: jest.fn(),
		};
		const wrapper = renderAccommodations(initialProps);
		wrapper.setState(initialProps.state);
		const changeFilter = wrapper.find('#filterVal');
		const value = {
			preventDefault: jest.fn(),
			target: {
				id: 'filterVal',
				value: 50000,
			},
		};
		changeFilter.simulate('change', value);
		wrapper.setState({
			inputType: 'number',
			filterValue: 50000,
			filter: 'costLessOr',
		});
		const { hide, filterValue } = wrapper.instance().state;
		expect(hide).toBe(true);
		expect(filterValue).toBe(50000);
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).getAccomodations();
		mapDispatchToProps(jest.fn()).getAccomodationsByFilter('name=kigali');
	});
});
