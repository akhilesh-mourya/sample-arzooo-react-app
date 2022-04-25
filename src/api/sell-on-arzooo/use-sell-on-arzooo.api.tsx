import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

async function sellOnArzooo(input: any) {
	const response = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.SELL_ON_ARZOOO}`,
		input,
	);
	return response;
}

export const useSellOnArzoooMutation = () => {
	const { addToast } = useToasts();
	return useMutation((input: any) => sellOnArzooo(input), {
		onSuccess: (data) => {
			if (data?.data.status === 'success') {
				addToast(data?.data?.msg);
				window?.location?.reload();
			} else {
				addToast('Server is down. Please try again!');
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
