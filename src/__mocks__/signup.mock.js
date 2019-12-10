export const createdUser = {
	email: 'murhula.metre@andela.com',
	password: '12345678@@M',
	confirmPassword: '1234567@M',
	fullname: 'lemoisson metre',
};

export const errorResp = {
	status: 400,
	response: {
		data: {
			status: 400,
			msg: 'invalid password',
		},
	},
};

export const successResp = {
	status: 201,
	response: {
		status: 201,
		message: 'any message',
		data: {},
	},
};
