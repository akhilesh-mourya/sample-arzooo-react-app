import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { addToCart } from '@/helpers/scripts.helpers';
import { useCart } from '@/context/cart.context';

async function updateCart(input: any) {
	const { data } = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`,
		input,
	);
	return data;
}

export const useAddToCartMutation = () => {
	const { addToast } = useToasts();
	const { setCartCount, setCartData } = useCart();
	return useMutation((input: any) => updateCart(input), {
		onSuccess: (data) => {
			addToast('Added to cart.');
			axoisInstance
				.get(`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CART}`)
				.then((response: any) => {
					if (response?.data?.status === 'success' && window) {
						setCartCount(response?.data?.data?.length);
						setCartData(response?.data?.data);
						addToCart(window, {
							cartCount: response?.data?.data?.length,
						});
					} else {
					}
				})
				.catch((err: any) => {});
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
