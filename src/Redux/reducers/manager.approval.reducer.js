import constants from '../constants';

const initialState = {
	previewStatus: 'not_started',
	previewedRequest: 'not_started',
	approvalRequests: [],
	message: '',
	messageClass: 'spinner-border text-primary approval-spinner',
	filter: 'pending',
	PreviewedHTML: '',
	pager: 0,
	aRStatus: {},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case constants.MANAGER_PREVIEW_PENDING:
			return {
				...state,
				previewStatus: 'pending',
				message: '',
				messageClass: 'spinner-border text-primary approval-spinner',
			};
		case constants.MANAGER_PREVIEW_SUCCESS:
			if (payload.data) {
				return {
					...state,
					approvalRequests: payload.data.sort((a, b) => (a.id < b.id ? 1 : -1)),
					message: 'Your Requests',
					messageClass: 'text-primary font-weight-bolder',
					previewStatus: 'success',
					pager: 1,
				};
			}
			return {
				...state,
				previewStatus: 'none',
				message: 'your direct reports have not made any requests so far!',
				messageClass: 'alert alert-info approval-message',
			};
		case constants.MANAGER_PREVIEW_FAILED:
			return {
				...state,
				message: `${payload.msg}, try to login as a manager`,
				messageClass: 'alert alert-warning approval-message',
				previewStatus: 'failed',
			};
		case constants.REQUEST_PREVIEW_ONE:
			return {
				...state,
				previewedRequest: 'started',
				PreviewedHTML: payload,
			};
		case constants.REQUEST_PREVIEW_ONE_STOP:
			return {
				...state,
				previewedRequest: 'not_started',
				PreviewedHTML: '',
			};
		case constants.REQUEST_PREVIEW_ONE_PENDING:
			return {
				...state,
				previewedRequest: 'pending',
			};
		case constants.MANAGER_PREVIEW_FILTER:
			return {
				...state,
				filter: payload,
				pager: 1,
			};
		case constants.MANAGER_PREVIEW_PAGERS:
			return {
				...state,
				pager: payload,
			};
		case constants.MANAGER_PREVIEW_ARSTATUS:
			return {
				...state,
				aRStatus: payload,
			};
		default:
			return state;
	}
};
