export const users = [
	{ fullname: 'public', id: -1 },
	{ fullname: 'alexis', id: 2 },
	{ fullname: 'eric', id: 1 },
	{ fullname: 'jean', id: 3, avatar: 'erfergferg43543r34g' },
	{ fullname: 'like', id: 4 },
];

export const chats = {
	public: [
		{
			id: 1,
			message: '@hello',
			createdAt: new Date(),
			author: { fullname: 'eric' },
			authorId: 1,
			accommodation: { id: 1, name: 'hotel' },
		},
		{
			id: 2,
			message: 'hello',
			createdAt: new Date(),
			author: { fullname: 'alexis' },
			authorId: 2,
			accommodation: { id: 2, name: 'hotel' },
		},
	],
	'2,alexis': [
		{
			id: 1,
			message: 'hello',
			createdAt: new Date(),
			author: { fullname: 'alexis' },
			authorId: 2,
			receiverId: 1,
			accommodation: { id: 1, name: 'hotel' },
		},
	],
	'3,jean': [
		{
			id: 1,
			message: 'hello',
			createdAt: new Date(),
			author: { fullname: 'alexis' },
			authorId: 3,
			receiverId: 1,
			accommodation: { id: 1, name: 'hotel' },
		},
	],
};
