import apis from '../../Api';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import axios from 'axios';

jest.mock('axios');

Enzyme.configure({
	adapter: new Adapter(),
});

describe('Test Manager End point', () => {
	it('test get manager request', done => {
		sinon.spy(axios, 'get');
		(() => {
			const data = {
				msg: 'msg',
				status: 200,
				data: [],
			};
			axios.get.mockResolvedValue({
				data,
			});
		})();
		apis.getManagerRequest(1, 'fefd');
		axios.get.restore();
		done();
	});
	it('test patch manager request', done => {
		sinon.spy(axios, 'patch');
		(() => {
			const data = {
				msg: 'msg',
				status: 200,
				data: [],
			};
			axios.patch.mockResolvedValue({
				data,
			});
		})();
		apis.changeRequestStatus(1, 'er', 'wd');
		axios.patch.restore();
		done();
	});
	it('test post like accommodation', done => {
		sinon.spy(axios, 'post');
		(() => {
			const data = {
				msg: 'msg',
				status: 201,
				data: [],
			};
			axios.post.mockResolvedValue({
				data,
			});
		})();
		apis.likeAccommodation(1, 'fefd');
		axios.post.restore();
		done();
	});
});
