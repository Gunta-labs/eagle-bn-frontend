import axios from 'axios';
import baseURL from './config';
import { token } from '../helper/helper';

export default async data =>
	axios.post(`${baseURL}requests`, data, {
		headers: {
			Authorization: token,
		},
	});
