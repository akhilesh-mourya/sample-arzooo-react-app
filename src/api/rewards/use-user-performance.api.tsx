import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchUserPerformance = async () => {
	const response = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.USER_PERFORMANCE}`,
	);
	return response;
};

export const useUserPerformance = () => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.USER_PERFORMANCE],
		fetchUserPerformance,
	);
};
