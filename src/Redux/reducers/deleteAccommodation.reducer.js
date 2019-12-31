const initialState = {
	data: null,
	delete_error: null,
	deleted: false,
};

const DeleteAccommodations = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'ACCOMMODATION_DELETE_SUCCESS':
			return {
				...state,
				data: payload,
				delete_error: null,
				deleted: true,
			};
		case 'ACCOMMODATION_DELETE_ERROR':
			return {
				...state,
				data: null,
				delete_error: payload,
				deleted: false,
			};
		default:
			return state;
	}
};

export default DeleteAccommodations;
