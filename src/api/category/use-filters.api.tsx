import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchCategoryFilters = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	if (_params.category) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.CATEGORY_FILTERS}/${_params.category}`,
		);
		return data;
	}
};

export const useCategoryFilters = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.CATEGORY_FILTERS, options],
		fetchCategoryFilters,
	);
};
