import apis from '../Api';

export default async userId => {
	try {
		const res = await apis.getUserProfile(userId);
		if (res.status === 200) {
			localStorage.setItem('user', JSON.stringify(res.data.data));
			return res.data.data;
		}
	} catch (error) {
		return false;
	}
};
