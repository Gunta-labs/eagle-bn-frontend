import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Page from '../../App/Pages/not.found.page';
import config from '../../helper/test.helper';

Enzyme.configure({
	adapter: new Adapter(),
});

const component = <Page />;
it('Renders without crushing', () => {
	config.mountNewWrapper(config.mockStore({}), component);
});
