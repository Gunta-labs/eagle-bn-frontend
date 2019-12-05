import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import config from '../../helper/test.helper';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import SocialLogin from '../../App/Components/socialLogin';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

Enzyme.configure({
	adapter: new Adapter(),
});

const component = <SocialLogin />;
describe('Render SocialLogin component', () => {
	it('to have wrapper class', async () => {
		const wrapper = config.mountNewWrapper(store, component);
		const facebookbtn = wrapper.find('#facebook').first();
		const googlebtn = wrapper.find('#google').first();
		const Event1 = { target: { name: 'Facebook' } };
		const Event2 = { target: { name: 'Google' } };
		facebookbtn.simulate('click', Event1);
		googlebtn.simulate('click', Event2);
		expect(googlebtn.length).toBe(1);
		expect(facebookbtn.length).toBe(1);
	});
});
