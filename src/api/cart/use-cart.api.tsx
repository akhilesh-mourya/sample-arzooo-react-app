import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchCart = async () => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`,
	);
	return data;
};

export const useCartData = () => {
	return useQuery<any, Error>([API_ENDPOINTS.CART], () => fetchCart());
};
