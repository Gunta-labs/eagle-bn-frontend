import React from 'react';
import { storiesOf } from '@storybook/react';
import configureStore from '../src/Redux/store';
import { Provider } from 'react-redux';
import RequestResetPassword from '../src/App/Pages/request.reset.password.page';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../src/Api/axios';
import MockAdapter from 'axios-mock-adapter';
import '../src/Assets/scss/style.scss';

const store = configureStore;
const mock = new MockAdapter(axios);

const withProvider = story => <Provider store={store}> {story()} </Provider>;

storiesOf('Request Reset Password', module)
	.addDecorator(withProvider)
	.add('Default', () => {
		mock.onPost('/users/reset-password').reply(400, {});
		return (
			<Router>
				<RequestResetPassword />
			</Router>
		);
	})
	.add('Pending', () => {
		mock.onPost('/users/reset-password').timeoutOnce();
		return (
			<Router>
				<RequestResetPassword />
			</Router>
		);
	})
	.add('Success', () => {
		mock.onPost('/users/reset-password').reply(201, {});
		return (
			<Router>
				<RequestResetPassword />
			</Router>
		);
	})
	.add('Failed', () => {
		mock.onPost('/users/reset-password').reply(400, {});
		return (
			<Router>
				<RequestResetPassword />
			</Router>
		);
	})
	.add('Error', () => {
		mock.onPost('/users/reset-password').reply(500, {});
		return (
			<Router>
				<RequestResetPassword />
			</Router>
		);
	});
