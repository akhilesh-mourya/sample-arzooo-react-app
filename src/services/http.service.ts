/**
 * main http file where all the api call are redirected
 * also we hanlde refresh token logic here using axios interceptors
 *
 * Author: Vakadu Vinod
 */

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axios from 'axios';

import {
	getAccessToken,
	getRefreshToken,
	updateAccessToken,
} from './token.service';

const baseUrl = process.env.NEXT_PUBLIC_MAIN;

let headers = {};
let retry = false;

const axoisInstance = axios.create({
	baseURL: baseUrl,
	headers: headers,
});

axoisInstance.interceptors.request.use(
	(config): any => {
		//add headers here and return the config
		const token = getAccessToken();
		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		return config;
	},
	(error): any => {
		return Promise.reject(error);
	},
);

axoisInstance.interceptors.response.use(
	async (res) => {
		// check if the token is expired
		// retry condition so that it doesnt go to infinite loop
		if (
			res?.data?.status === 'error' &&
			res?.data?.msg === 'Token Expired' &&
			!retry
		) {
			try {
				//get the refresh token
				const resp = await axios.post(
					`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.REFRESH_TOKEN}`,
					{
						refreshToken: getRefreshToken(),
					},
				);
				// if the token is invlaid logout the user
				// or route to particular page
				if (
					resp?.data?.status === 'error' &&
					resp?.data?.msg === 'Invalid Token'
				) {
					console.log('logout user');
				} else {
					retry = true;
					//if success we get an access token
					const { accessToken } = resp.data;
					// update current old access token with the new one
					updateAccessToken(accessToken);
					//after toke gets updated call the old api again
					return axoisInstance(res.config);
				}
			} catch (err) {
				return Promise.reject(err);
			}
		} else if (
			res?.data?.status === 'error' &&
			res?.data?.msg === 'Invalid Token'
		) {
			//Logout user
			console.log('logout user');
		} else {
			//return the response if everything goes well
			return res;
		}
	},
	async (err) => {
		return Promise.reject(err);
	},
);

export default axoisInstance;
