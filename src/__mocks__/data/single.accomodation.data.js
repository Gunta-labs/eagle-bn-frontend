export const initialProps = {
	editMode: true,
	model: null,
	draftComment: '',
	comment_child: '',
	commentId: 203,
	edited_success: null,
	trash_success: null,
	reply_pending: false,
	reply_success: 'Okk',
	retreiveComment: jest.fn(),
	loading_reply_comment: jest.fn(),
	sendCommentReply: jest.fn(),
	sendReply: jest.fn(),
	loading_sent_comment: jest.fn(),
	send_success: 'Okk',
	send_pending: false,
	sendComment: jest.fn(),
	handleInput: jest.fn(),
	getComments: jest.fn(),
	loading_comment: jest.fn(),
	pending_comment: false,
	comment_error: null,
	reply: '',
	props: {
		match: {
			params: {
				id: 1,
			},
		},
		userId: 3,
	},
	comments: [
		{
			id: 203,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [
				{
					id: 205,
					comment: 'reply 1',
					createdAt: '2019-12-31T19:41:56.511Z',
					userId: 3,
					'User.RoleId': 5,
					'User.fullname': 'requester',
				},
			],
		},
	],
};

export const initialProps2 = {
	editMode: null,
	model: null,
	draftComment: '',
	comment_child: '',
	commentId: '',
	edited_success: null,
	trash_success: null,
	reply_pending: false,
	reply_success: 'Okk',
	retreiveComment: jest.fn(),
	loading_reply_comment: jest.fn(),
	sendCommentReply: jest.fn(),
	sendReply: jest.fn(),
	loading_sent_comment: jest.fn(),
	send_success: 'Okk',
	send_pending: false,
	sendComment: jest.fn(),
	handleInput: jest.fn(),
	getComments: jest.fn(),
	loading_comment: jest.fn(),
	pending_comment: false,
	comment_error: null,
	reply: '',
	props: {
		match: {
			params: {
				id: 1,
			},
		},
		userId: 3,
	},
	comments: [
		{
			id: 203,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [],
		},
	],
};

export const initialProps3 = {
	props: {
		match: {
			params: {
				id: 1,
			},
		},
		userId: 3,
	},
	comments: [
		{
			id: 203,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [
				{
					id: 203,
					comment: 'secont coomment',
					createdAt: '2019-12-31T19:40:55.091Z',
					userId: 3,
					'User.RoleId': 5,
					'User.fullname': 'requester',
					replies: [],
				},
			],
		},
	],
	loading_comment: jest.fn(),
	getComments: jest.fn(),
	editComment: jest.fn(),
};

export const initialProps4 = {
	props: {
		match: {
			params: {
				id: 1,
			},
		},
		userId: 3,
	},
	comments: [
		{
			id: 203,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [
				{
					id: 202,
					comment: 'secont coomment',
					createdAt: '2019-12-31T19:40:55.091Z',
					userId: 3,
					'User.RoleId': 5,
					'User.fullname': 'requester',
					replies: [],
				},
			],
		},
		{
			id: 204,
			comment: 'secont coomment',
			createdAt: '2019-12-31T19:40:55.091Z',
			userId: 3,
			'User.RoleId': 5,
			'User.fullname': 'requester',
			replies: [
				{
					id: 202,
					comment: 'secont coomment',
					createdAt: '2019-12-31T19:40:55.091Z',
					userId: 3,
					'User.RoleId': 4,
					'User.fullname': 'requester',
					replies: [],
				},
			],
		},
	],
	loading_comment: jest.fn(),
	getComments: jest.fn(),
	editComment: jest.fn(),
};
