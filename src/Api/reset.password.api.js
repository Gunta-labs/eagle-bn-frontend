import axios from 'axios';
import baseURL from './config';

export const requestResetPassword = async data =>
	axios.post(`${baseURL}/users/reset-password`, data);

export const resetPassword = async (data, token) =>
	axios.patch(`${baseURL}/users/reset-password/${token}`, data);
