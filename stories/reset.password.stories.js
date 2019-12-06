import React from 'react';
import { storiesOf } from '@storybook/react';
import configureStrore from '../src/Redux/store';
import { Provider } from 'react-redux';
import ResetPassword from '../src/App/Pages/reset.password.page';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../src/Api/axios';
import MockAdapter from 'axios-mock-adapter';

const store = configureStrore;
const mock = new MockAdapter(axios);
const token = 'wrwrwr3wr3';
const url = '/users/reset-password/wrwrwr3wr3';

const withProvider = story => <Provider store={store}> {story()} </Provider>;

storiesOf('Reset Password', module)
	.addDecorator(withProvider)
	.add('Default', () => {
		mock.onPatch(url).reply(200);
		return (
			<Router>
				<ResetPassword
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.add('Pending', () => {
		mock.onPatch(url).timeoutOnce();
		return (
			<Router>
				<ResetPassword
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.add('Success', () => {
		mock.onPatch(url).reply(200);
		return (
			<Router>
				<ResetPassword
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.add('Failed', () => {
		mock.onPatch(url).reply(400);
		return (
			<Router>
				<ResetPassword
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.add('Error', () => {
		mock.onPatch(url).reply(500);
		return (
			<Router>
				<ResetPassword
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	});
