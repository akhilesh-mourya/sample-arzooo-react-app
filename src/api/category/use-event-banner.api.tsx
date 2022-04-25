import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchEventPage = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	if (_params.id) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.EVENT_BANNER}${_params.id}`,
		);
		return data;
	}
};

export const useEventBanner = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.CATEGORY_FILTERS, options],
		fetchEventPage,
	);
};
