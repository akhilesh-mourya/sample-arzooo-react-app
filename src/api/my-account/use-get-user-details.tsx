import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

export const fetchUserDetails = async (user_id) => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.USER_DETAILS}${user_id}`,
	);
	return data;
};

export const useGetUserDetails = () => {
	const { session } = useAuth();
	return useQuery<any, Error>([API_ENDPOINTS.USER_DETAILS], () =>
		fetchUserDetails(session?.user_id),
	);
};
