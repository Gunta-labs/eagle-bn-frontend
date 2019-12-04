import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const middleware = [thunk];

const configureStore = (initialState = {}) => {
	return createStore(
		allReducers,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware)),
	);
};

export default configureStore;
