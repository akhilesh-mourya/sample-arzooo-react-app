import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchUserOrders = async ({ queryKey }) => {
	const [_key, _params] = queryKey;
	if (_params.path) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.FETCH_ORDERS}${_params.path}`,
		);
		return data;
	}
};

export const useFetchOrders = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.FETCH_ORDERS, options],
		fetchUserOrders,
	);
};
