import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchCategoriesFilters = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	if (_params.id) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.OFFER_CATEGORIESFILTERS}?isFalcon=false&id=${_params.id}&page=1`,
		);
		return data;
	}
};

export const useCatFilters = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.OFFER_CATEGORIESFILTERS, options],
		fetchCategoriesFilters,
	);
};
