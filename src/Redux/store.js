import { createStore } from 'redux';
import allReducers from './Reducers';

const store = createStore(allReducers);

export default store;
