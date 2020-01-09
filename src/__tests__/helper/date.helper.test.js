import dateParser from '../../helper/date.helper';

describe('test date parser', () => {
	it('should return a formated date', done => {
		expect(dateParser(new Date())).toEqual('a few seconds ago');
		done();
	});
	it('should return a formated date', done => {
		expect(dateParser()).toEqual('Not specified');
		done();
	});
	it('should return 4 days ago', done => {
		const date = new Date();
		date.setDate(date.getDate() - 4);
		expect(dateParser(date)).toEqual('4 days ago');
		done();
	});
});
