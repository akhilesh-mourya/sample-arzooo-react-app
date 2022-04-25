import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchOrderDetails = async ({ queryKey }) => {
	const [_key, _params] = queryKey;
	if (_params.id && _params.shipment) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.ORDER_DETAILS}?orderId=${_params.id}&shipmentNo=${_params.shipment}`,
		);
		return data;
	}
};

export const useOrderDetails = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.ORDER_DETAILS, options],
		fetchOrderDetails,
	);
};
