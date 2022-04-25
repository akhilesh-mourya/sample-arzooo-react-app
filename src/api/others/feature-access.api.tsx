import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchUserAccess = async () => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.FEATURE_ACCESS}`,
	);
	return data;
};

export const useUserAccess = () => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.FEATURE_ACCESS],
		fetchUserAccess,
	);
};
