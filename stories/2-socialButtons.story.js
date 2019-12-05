import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';

export default {
	title: 'Social buttons',
};

export const googleText = () => <Button onClick={action('clicked')}>google login</Button>;
export const facebooktText = () => <Button onClick={action('clicked')}>facebook login</Button>;
