import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import config from '../../helper/test.helper';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import LoginFacebook from '../../App/Components/facebookLogin';
import { Provider } from 'react-redux';
import Button from '../../App/Components/socialButton';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { facebookLoginAction } from '../../Redux/Actions/facebookLoginAction';
import sinon from 'sinon';
import axios from 'axios';

jest.mock('axios');

const store = config.mockStore({
	facebook: {
		user: {
			p: 'lelelel',
		},
		error: {},
	},
});

Enzyme.configure({
	adapter: new Adapter(),
});

describe('Render Facebook login component', () => {
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
	it('should have the facebook login button', done => {
		const wrapper = mount(
			<Provider store={store}>
				<LoginFacebook />
			</Provider>,
		);
		sinon.spy(facebookLoginAction);
		expect(wrapper.find('.kep-login-facebook')).toExist();
		done();
	});
	it('Should return 200 status when logged in successfully', async () => {
		axios.post.mockResolvedValue({
			msg: 'msg',
			status: 200,
		});
		sinon.spy(axios, 'post');

		const wrapper = mount(
			<Provider store={store}>
				<LoginFacebook />
			</Provider>,
		);
		sinon.spy(facebookLoginAction);
		wrapper.find('.kep-login-facebook').simulate('click');
		console.log(wrapper.find(LoginFacebook).props());
		wrapper
			.find(FacebookLogin)
			.props()
			.callback({ response: { accessToken: 'krkrkrkrkkr' }, provider: 'facebook' });
		expect(axios.calledOnce);
		expect((await axios.post.getCall(0).returnValue).status).toEqual(200);
		sinon.restore();
	});
	it('Should return 401 status when failed to login', async () => {
		const data = {
			response: {
				data: {
					msg: 'msg',
					status: 401,
				},
			},
		};
		axios.post.mockImplementationOnce(() => Promise.reject(data));
		sinon.spy(axios, 'post');

		const wrapper = mount(
			<Provider store={store}>
				<LoginFacebook />
			</Provider>,
		);
		sinon.spy(facebookLoginAction);
		wrapper.find('.kep-login-facebook').simulate('click');
		console.log(wrapper.find(LoginFacebook).props());
		wrapper
			.find(FacebookLogin)
			.props()
			.callback({ response: { accessToken: 'krkrkrkrkkr' }, provider: 'facebook' });
		wrapper
			.find(FacebookLogin)
			.props()
			.render({ renderProps: {} });
		expect(axios.calledOnce);
		try {
			await axios.post.getCall(0).returnValue;
		} catch (err) {
			expect(err.response.data.status).toEqual(401);
		}
		sinon.restore();
	});
});
