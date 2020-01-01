import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Page from '../../App/Pages/not.found.page';
import config from '../../helper/test.helper';
import data from '../../__mocks__/data/header.data';

Enzyme.configure({
	adapter: new Adapter(),
});

const component = <Page />;
it('Renders without crushing', () => {
	config.mountNewWrapper(config.mockStore(data.mockData.successState), component);
});
