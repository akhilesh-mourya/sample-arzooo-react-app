import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

export const fetchBlackSoilCreditDetails = async (id: any) => {
	return axoisInstance.get<any>(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.BLACKSOIL_CREDIT_DETAILS}${id}`,
	);
};

export const useBlackSoilCreditDetails = () => {
	const { session } = useAuth();
	return useQuery<any, Error>(
		[API_ENDPOINTS.BLACKSOIL_CREDIT_DETAILS, session?.user_id],
		async () => {
			const { data } = await fetchBlackSoilCreditDetails(
				session?.user_id,
			);
			return data;
		},
	);
};
