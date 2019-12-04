import React from 'react';
import { storiesOf } from '@storybook/react';
import configureStrore from '../src/Redux/store';
import { Provider } from 'react-redux';
import VerifyUser from '../src/App/Pages/VerifyUser.page';
import constants from '../src/Redux/constants/index';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import BASE_URL from '../src/Api/config';

// 2. create the mock
const mock = new MockAdapter(axios);
const store = configureStrore;

const withProvider = story => <Provider store={store}> {story()} </Provider>;
const token = 'pppepepepepppe';
storiesOf('Verify User Page', module)
	.addDecorator(withProvider)
	.add('Success', () => {
		mock.onGet(`${BASE_URL}users/verify/${token}`).reply(200, { verifyUser: false, status: 200 });
		return (
			<Router>
				<VerifyUser
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.add('Error verifying', () => {
		mock.onGet(`${BASE_URL}users/verify/${token}`).reply(401, { data: { verify: false } });
		return (
			<Router>
				<VerifyUser
					match={{
						params: {
							token,
						},
					}}
				/>
			</Router>
		);
	})
	.addDecorator(story => (
		<div
			style={{
				padding: '3rem',
			}}
		>
			{' '}
			{story()}{' '}
		</div>
	))
	.add('pending', () => {
		mock.onGet(`${BASE_URL}users/verify/939399339393`).timeoutOnce();

		return (
			<Router>
				<VerifyUser
					pending={true}
					match={{
						params: {
							token: '939399339393',
						},
					}}
					{...constants}
				/>
			</Router>
		);
	});
