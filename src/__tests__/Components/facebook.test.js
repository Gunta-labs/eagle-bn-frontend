import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import config from '../../helper/test.helper';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LoginFacebook from '../../App/Components/facebookLogin';
import { Provider } from 'react-redux';
import Button from '../../App/Components/socialButton';

const store = config.mockStore({
	facebook: {
		user: {},
		error: {},
	},
});

Enzyme.configure({
	adapter: new Adapter(),
});

describe('Render Facebook login component', () => {
	it('to have wrapper class', async () => {
		const wrapper = render(
			<Provider store={store}>
				<LoginFacebook />
			</Provider>,
		);
		wrapper.find(<FacebookLogin />).html();
		wrapper.find(<Button />).html();
	});
});
