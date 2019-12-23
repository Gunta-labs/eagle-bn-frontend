import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import SocialLogin from '../../App/Components/social.login';
import LoginFacebook from '../../App/Components/facebookLogin';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);
let store = mockStore({
	facebook: {
		user: {},
	},
	GoogleLogin: jest.fn(),
});

Enzyme.configure({
	adapter: new Adapter(),
});

describe('Render SocialLogin component', () => {
	beforeEach(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);

		const div = document.createElement('div');

		ReactDOM.render(
			<Provider store={store}>
				<LoginFacebook />
			</Provider>,
			div,
		);
		ReactDOM.unmountComponentAtNode(div);
	});
	it('to have a component with class = social', async done => {
		const wrapper = mount(
			<Provider store={store}>
				<SocialLogin />
			</Provider>,
		);
		expect(wrapper.find('.social').first()).toExist();
		done();
	});
	it('should redirect after clicking on google button', async done => {
		const wrapper = mount(
			<Provider store={store}>
				<SocialLogin />
			</Provider>,
		);
		expect(wrapper.find('.btn-google').first()).toExist();
		global.window = Object.create(window);
		const url = 'login';
		Object.defineProperty(window, 'location', {
			value: {
				href: url,
				assign: url => {
					window.location.href = url;
				},
			},
		});
		expect(window.location.href).toEqual(url);
		wrapper.find('.btn-google').simulate('click');
		expect(window.location.href).toEqual(
			'https://eagle-bn-backend-staging.herokuapp.com/api/v1//users/google',
		);
		done();
	});
});
