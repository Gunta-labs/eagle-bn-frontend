import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
	const { name, onClick, styleClass, logo } = props;
	return (
		<button type='button' onClick={onClick} className={styleClass}>
			{logo ? <img className='socialButtonImg' src={logo} alt='social logo' /> : null}
			{name}
		</button>
	);
};

Button.propTypes = {
	name: PropTypes.any.isRequired,
	onClick: PropTypes.func,
	styleClass: PropTypes.any,
	logo: PropTypes.any,
};

export default Button;
