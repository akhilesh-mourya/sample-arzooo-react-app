import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchProduct = async ({ queryKey }) => {
	const [_key, _params] = queryKey;
	if (_params.id) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_API}${API_ENDPOINTS.GET_PRODUCT_DETAILS}/${_params.id}`,
		);
		return data;
	}
};

export const useProductDetails = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.GET_PRODUCT_DETAILS, options],
		fetchProduct,
	);
};
