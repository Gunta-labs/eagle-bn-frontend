import React from 'react';
import { GetAllAccomodations, mapDispatchToProps } from '../../App/Pages/accomodations';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderAccommodation = args => {
	const props = { ...args };
	return shallow(<GetAllAccomodations {...props} />);
};

describe.only('should find retrieved accommodations', () => {
	it('Should render', () => {
		const initialProps = {
			accomodation: {
				data: {},
			},
			getAccomodations: jest.fn(),
			Accomodations: jest.fn(),
		};

		const wrapper = renderAccommodation(initialProps);
		expect(wrapper).toHaveLength(1);
	});
	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).getAccomodations();
	});
});
