import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

async function requestCallback(input: any) {
	const response = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.REQUEST_CALLBACK}`,
		input,
	);
	return response;
}

export const useRequestCallback = () => {
	const { addToast } = useToasts();
	const tzOffset = new Date().getTimezoneOffset() * 60000;
	const localTimeNow = new Date(Date.now() - tzOffset)
		.toISOString()
		.slice(0, -1);
	const { session } = useAuth();
	const params = {
		userId: session.user_id,
		storeName: session.name,
		mobileNumber: session.phone_number.toString(),
		requestTime: localTimeNow,
	};
	return useMutation(() => requestCallback(params), {
		onSuccess: (data) => {
			if (data?.data.status !== 'success') {
				addToast('Server is down. Please try again!');
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
