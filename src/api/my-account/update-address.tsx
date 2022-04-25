import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import * as gtag from '@/services/gtag.service';
import { useAuth } from '@/context/auth.context';

async function updateAddress(input: any) {
	const { data } = await axoisInstance.put(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.UPDATE_ADDRESS}`,
		input,
	);
	return data;
}

export const useUpdateAddressMutation = () => {
	const { addToast } = useToasts();
	const { session } = useAuth();
	return useMutation((input: any) => updateAddress(input), {
		onSuccess: (data) => {
			gtag.event({
				action: 'user_click_on_address',
				category: 'address_updated',
				label: 'success_address_update',
				value: JSON.stringify(data),
			});
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
