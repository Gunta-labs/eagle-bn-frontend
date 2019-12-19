import constants from '../constants';
import apis from '../../Api';

export const managerPreview = (managerId, token) => async dispatch => {
	try {
		dispatch({ type: constants.MANAGER_PREVIEW_PENDING, payload: {} });
		const res = await apis.getManagerRequest(managerId, token);
		if (res.status === 200) {
			dispatch({ type: constants.MANAGER_PREVIEW_SUCCESS, payload: res.data });
		}
	} catch (error) {
		const { response } = error;
		if (response && (response.status === 400 || response.status === 401)) {
			dispatch({ type: constants.MANAGER_PREVIEW_FAILED, payload: response.data });
		} else {
			dispatch({
				type: constants.MANAGER_PREVIEW_ERROR,
				payload: 'Something went wrong!, Try again later!',
			});
		}
	}
};

export const changeFilter = payload => dispatch =>
	dispatch({ type: constants.MANAGER_PREVIEW_FILTER, payload });

export const requestPreviewOne = payload => dispatch =>
	dispatch({ type: constants.REQUEST_PREVIEW_ONE, payload });

export const requestPreviewOneStop = () => dispatch =>
	dispatch({ type: constants.REQUEST_PREVIEW_ONE_STOP, payload: {} });

export const requestPreviewPending = () => dispatch =>
	dispatch({ type: constants.REQUEST_PREVIEW_ONE_PENDING, payload: {} });

export const changePager = payload => dispatch =>
	dispatch({ type: constants.MANAGER_PREVIEW_PAGERS, payload });

export const changeaRStatus = payload => dispatch =>
	dispatch({ type: constants.MANAGER_PREVIEW_ARSTATUS, payload });

export const changeReqStatus = (request, status, token) => async dispatch => {
	try {
		dispatch({ type: constants.MANAGER_PREVIEW_ARSTATUS, payload: { status: 'pending' } });
		await apis.changeRequestStatus(request, status, token);
		dispatch({ type: constants.MANAGER_PREVIEW_ARSTATUS, payload: { status: 'success' } });
	} catch (err) {
		dispatch({ type: constants.MANAGER_PREVIEW_ARSTATUS, payload: { status: 'success' } });
	}
};
