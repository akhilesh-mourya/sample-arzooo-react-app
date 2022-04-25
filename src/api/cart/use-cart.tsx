import axoisInstance from '@/services/http.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { API_ENDPOINTS } from '../utils/api-endpoints.api';

const fetchCart = async () => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`,
	);
	return data;
};

export const useFetchCart = () => {
	return useQuery<any, Error>([API_ENDPOINTS.CART], fetchCart);
};

const deleteCartItem = async (cartId) => {
	const {
		data,
	} = await axoisInstance.delete(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`,
		{ data: { cartId } },
	);
	return data;
};

export const useCartDeleteMutation = () => {
	const { addToast } = useToasts();
	const queryClient = useQueryClient();

	return useMutation((cartId: number) => deleteCartItem(cartId), {
		onSuccess: (data) => {
			if (data?.status === 'error') {
				addToast(data.msg);
			} else {
				queryClient.invalidateQueries(API_ENDPOINTS.CART);
				addToast('Product removed from cart');
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
