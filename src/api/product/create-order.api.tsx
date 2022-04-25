import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { buyNow, payCart } from '@/helpers/scripts.helpers';

async function createOrder(orderData: any) {
	const { data } = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CREATE_ORDER}`,
		orderData,
	);
	return data;
}

export const useCreateOrderMutation = (prodObj) => {
	const { addToast } = useToasts();
	return useMutation((orderData: any) => createOrder(orderData), {
		onSuccess: (data) => {
			if (data?.status === 'success' && window) {
				buyNow(window, data.orderData, prodObj);
			} else {
				addToast(data?.msg);
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};

export const useCreateOrderCartMutation = () => {
	const { addToast } = useToasts();
	return useMutation((orderData: any) => createOrder(orderData), {
		onSuccess: (data) => {
			if (data?.status === 'success' && window) {
				payCart(window, data.orderData);
			} else {
				addToast(data?.msg);
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
