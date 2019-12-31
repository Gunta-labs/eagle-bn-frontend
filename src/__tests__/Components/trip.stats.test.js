/* eslint-disable no-undef */
import React from 'react';
import TripStats from '../../App/Components/trip.stats';
import Data from '../../__mocks__/data/trip.stats.data';
import config from '../../helper/test.helper';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('axios');
let store, wrapper;
Enzyme.configure({
	adapter: new Adapter(),
});
const component = <TripStats />;
describe('Verify User page', () => {
	it('should have no days or month card on initial state', done => {
		Data.mockData.mockSuccess();
		store = config.mockStore(Data.mockData.initialState);
		wrapper = config.mountNewWrapper(store, component);
		expect(wrapper.find('.card-content-stats')).not.toExist();
		done();
	});
});
