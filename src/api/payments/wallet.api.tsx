import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

export const fetchWallet = async (amount, id) => {
	if (amount) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.PAYMENT_WALLET}/${amount}/${id}`,
		);
		return data;
	}
};

export const useWallet = (amount) => {
	const { session } = useAuth();
	return useQuery<any, Error>(
		[API_ENDPOINTS.PAYMENT_WALLET, amount, session.user_id],
		() => fetchWallet(amount, session.user_id),
	);
};
