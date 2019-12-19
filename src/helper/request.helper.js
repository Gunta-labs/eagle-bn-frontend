import apis from '../Api';

export default async (requestId, token) => {
	try {
		const res = await apis.getSingleRequest(requestId, token);
		if (res.status === 200) {
			return res.data.data;
		}
	} catch (error) {
		return false;
	}
};
