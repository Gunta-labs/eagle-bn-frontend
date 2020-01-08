import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import jwt from 'jsonwebtoken';
import ChatModel from '../../App/Components/chat.model';
import { users, chats } from '../../__mocks__/data/chat.mock';
import Apis from '../../Api';

jest.mock('axios');
configure({ adapter: new Adapter() });

const renderDashboard = args => {
	const props = { ...args };
	return shallow(<ChatModel {...props} />);
};

describe('Chats API Test', () => {
	afterEach(() => jest.resetAllMocks());
	it('load the users', done => {
		axios.get.mockResolvedValue(() => Promise.reject({}));
		Apis.getAllUsers();
		done();
	});
	it('get chats', done => {
		axios.get.mockResolvedValue(() => Promise.reject({}));
		Apis.getChats('sdff');
		done();
	});
	it('send chat', done => {
		axios.post.mockResolvedValue(() => Promise.reject({}));
		Apis.postChat({}, 'edewf');
		done();
	});
	it('Role', done => {
		axios.put.mockResolvedValue(() => Promise.reject({}));
		Apis.changeRole('cf', {});
		done();
	});
	it('Test chat model on public chat', done => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ userId: 1 });
		jest
			.spyOn(document, 'getElementsByClassName')
			.mockReturnValue([document.createAttribute('div')]);
		const props = {
			chats,
			user: users.find(e => e.id === -1),
			sendChatStatus: 'pending',
			activeChat: -1,
			users,
		};
		renderDashboard(props);
		done();
	});
	it('Test chat model on user chat', done => {
		jest.spyOn(jwt, 'decode').mockReturnValue({ userId: 1 });
		jest
			.spyOn(document, 'getElementsByClassName')
			.mockReturnValue([document.createAttribute('div')]);
		const props = {
			chats,
			user: users.find(e => e.id === -1),
			sendChatStatus: '',
			activeChat: 2,
			users,
		};
		const wrapper = renderDashboard(props);
		wrapper.setProps({ sendChatStatus: 'pending' });
		done();
	});
});
