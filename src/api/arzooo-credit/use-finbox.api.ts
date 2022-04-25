import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

export const fetchFinboxUserStatus = async (id: Number) => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.FINBOX_USER_STATUS}${id}`,
	);
	return data;
};

export const useFinboxUserStatus = () => {
	const { session } = useAuth();
	return useQuery<any, Error>([API_ENDPOINTS.FINBOX_USER_STATUS], () =>
		fetchFinboxUserStatus(session?.user_id),
	);
};
