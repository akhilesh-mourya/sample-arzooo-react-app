import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

export const fetchProduct = async ({ queryKey }) => {
	const [_key, _params] = queryKey;
	if (
		_params.name &&
		_params.id &&
		(_params.is_express === 'undefined' || _params.is_express === '0')
	) {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.GET_PRODUCT}/${_params.name}/${_params.name}/${_params.id}`,
		);
		if (data.status !== 'error') {
			let newObj = data?.data;
			let mod_value;
			newObj.quantity = data?.data?.min_quantity; //assign qty to min qty
			if (newObj.finalPrice === 0 || newObj.sales_quantity === 0) {
				//check if final price or sales qty is zero
				newObj.out_of_stock = 1;
				newObj.outOfStock = 1;
			} else {
				if (
					newObj.quantity > newObj.max_quantity &&
					newObj.max_quantity > 0
				) {
					newObj.quantity = newObj.max_quantity;
				}
				if (newObj.quantity > newObj.pack_quantity) {
					mod_value = newObj.quantity % newObj.pack_quantity;
					newObj.quantity = newObj.quantity - mod_value;
				}
				if (newObj.quantity < newObj.pack_quantity) {
					newObj.quantity = newObj.pack_quantity;
				}
				if (newObj.sales_quantity !== null) {
					if (newObj.quantity > newObj.sales_quantity) {
						newObj.quantity = newObj.sales_quantity;
						newObj.min_quantity = 1;
					}
				}
			}
			return newObj;
		}
		return data;
	} else if (_params.name && _params.id && _params.is_express === '1') {
		const { data } = await axoisInstance.get(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.GET_PRODUCT}/fetchExpressProduct/${_params.name}/${_params.name}/${_params.id}`,
		);
		if (data.status !== 'error') {
			let newObj = data?.data;
			let mod_value;
			newObj.quantity = data?.data?.min_quantity;
			if (newObj.finalPrice === 0 || newObj.sales_quantity === 0) {
				newObj.out_of_stock = 1;
				newObj.outOfStock = 1;
			} else {
				if (
					newObj.quantity > newObj.max_quantity &&
					newObj.max_quantity > 0
				) {
					newObj.quantity = newObj.max_quantity;
				}
				if (newObj.quantity > newObj.pack_quantity) {
					mod_value = newObj.quantity % newObj.pack_quantity;
					newObj.quantity = newObj.quantity - mod_value;
				}
				if (newObj.quantity < newObj.pack_quantity) {
					newObj.quantity = newObj.pack_quantity;
				}
				if (newObj.sales_quantity !== null) {
					if (newObj.quantity > newObj.sales_quantity) {
						newObj.quantity = newObj.sales_quantity;
						newObj.min_quantity = 1;
					}
				}
			}
			return newObj;
		}
		return data;
	}
};

export const useProduct = (options) => {
	return useQuery<any, Error>(
		[API_ENDPOINTS.GET_PRODUCT, options],
		fetchProduct,
	);
};
