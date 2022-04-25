import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchPartialPay = async (id) => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.PARTIAL_PAY}/${id}`,
	);
	return data;
};

export const usePartialPay = (id) => {
	return useQuery<any, Error>([API_ENDPOINTS.PARTIAL_PAY, id], () =>
		fetchPartialPay(id),
	);
};
