import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const middleware = [thunk];

const configureStore = (initialState = {}) => {
	return createStore(allReducers, initialState, applyMiddleware(...middleware));
};

export default configureStore;
