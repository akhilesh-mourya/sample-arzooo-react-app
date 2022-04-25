import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchCategoriesFilters = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	if (_params.id) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.OFFER_CATEGORIES}?isFalcon=${_params.isFalcon}&id=${_params.id}`,
		);
		return data;
	}
};

export const useCategoriesFilters = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.OFFER_CATEGORIES, options],
		fetchCategoriesFilters,
	);
};
