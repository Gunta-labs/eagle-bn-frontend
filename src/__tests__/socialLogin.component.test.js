import React from 'react';
import sinon from 'sinon';
import SocialLogin from '../App/components/socialLogin';
import config from '../helpers/test.helper';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

jest.mock('axios');
let store, wrapper;
Enzyme.configure({
	adapter: new Adapter(),
});

const social = (
	<SocialLogin
		match={{
			body: {
				access_token: 'thisisthetoken',
			},
		}}
	/>
);

sinon.stub(window.location, 'replace');

describe('Render SocialLogin component', () => {
	it('to have facebook wrapper class', async () => {
		wrapper = config.mountNewWrapper(store, <SocialLogin />);
		const facebtn = wrapper.find('#facebook');
		facebtn.simulate('click');
		wrapper
			.instance()
			.responseSocialLog({ response: { accessToken: 'acessToken' }, provider: 'facebook' });

		expect(facebtn.length).toBe(1);
	});

	it('to have google wrapper class', async () => {
		wrapper = config.mountNewWrapper(store, <SocialLogin />);
		const googlebtn = wrapper.find('#google');
		googlebtn.simulate('click');
		wrapper
			.instance()
			.responseSocialLog({ response: { accessToken: 'acessToken' }, provider: 'google' });

		expect(googlebtn.length).toBe(0);
	});
});
