import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from '../__mocks__/enzyme/enzymes';
import LandingComponent, { Landing } from '../App/Pages/landing.page';
import mockStore from '../__mocks__/mockStore';
import { data, accData } from '../__mocks__/data/landing.mock';
import helper from '../helper/test.helper';
import headerData from '../__mocks__/data/header.data';

const props = {
	stats: {
		payload: data,
	},
	accs: {
		payload: accData,
	},
	payload: accData,
	pending: jest.fn(),
	loading: jest.fn(),
	statsData: jest.fn(),
	accomodations: jest.fn(),
};
const store = helper.mockStore(headerData.mockData.successState);
const wrapper = helper.mountNewWrapper(store, <LandingComponent {...props} />);

const wrapperComponent = shallow(<Landing {...props} />);

describe('Landing page wrapper', () => {
	it('should render the landing page', () => {
		expect(wrapper.find('.hero')).toExist();
	});
	it('should render the landing page component', () => {
		expect(wrapperComponent.find('.hero')).toExist();
	});
});
