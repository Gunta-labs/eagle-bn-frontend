import React from 'react';
import { UpdateRequest, mapDispatchToProps } from '../../App/Pages/update.request.page';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const renderUpdateRequest = args => {
	const props = { ...args };
	return shallow(<UpdateRequest {...props} />);
};

const initialProps = {
	handleInputChange: jest.fn(),
	handleTripChange: jest.fn(),
	getRequest: jest.fn(),
	match: {
		params: {
			reqId: 1,
		},
	},
	Trips: [{ departureTime: '12/12/2012.T201' }],
	tripRequestStatus: 'success',
	returnTime: '12/12/2012.T201',
	messageClass: '',
	message: '',
	request: null,
	update: jest.fn(),
	handleSubmit: jest.fn(),
};

describe('Mount update request componet', () => {
	it('render when pending', async () => {
		const wrapper = renderUpdateRequest(initialProps);
		expect(wrapper).toHaveLength(1);
	});

	it('Should successfully submit a send comment form', async () => {
		const wrapper2 = renderUpdateRequest(initialProps);
		const form = wrapper2.find('#submit-form');
		const event = { preventDefault: jest.fn() };
		const country = { target: { name: 'departureTime-1', value: '12/12/2012.T201' } };
		form.find('#country').simulate('change', country);
		const country2 = { target: { name: 'country-0', value: '12/12/2012.T201' } };
		form
			.find('#country')
			.props()
			.onInput({ target: { value: 'Rwanda' }, preventDefault: jest.fn() });
		wrapper2.setState({ Trips: [{ departureTime: '2020-10-10' }] });
		wrapper2.find('.country-trip').simulate('change', country2);
		wrapper2
			.find('.country-trip')
			.props()
			.onInput({ target: { value: 'Rwanda' }, preventDefault: jest.fn() });
		form.simulate('submit', event);
	});

	it('should map the state to props', () => {
		mapDispatchToProps(jest.fn()).initialize();
		mapDispatchToProps(jest.fn()).update({}, 'wer', 4);
	});
});
