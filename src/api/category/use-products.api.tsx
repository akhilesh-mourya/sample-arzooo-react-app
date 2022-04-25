import { useInfiniteQuery } from 'react-query';

import axoisInstance from '@/services/http.service';
import { API_ENDPOINTS } from '../utils/api-endpoints.api';
import { CONSTANTS } from '@/helpers/persistent.helpers';

const fetchProducts = async ({ pageParam = 1, queryKey }: any) => {
	const [_key, _params] = queryKey;
	const filters = _params?.options ? JSON.parse(_params?.options) : {};
	const flatArray = [].concat.apply([], Object.values(filters));
	const brands = _params?.brand?.split(',') ? _params?.brand?.split(',') : [];
	const { data } = await axoisInstance.get(
		`${API_ENDPOINTS.CATEGORY_PRODUCTS}/${_params?.category}/${
			CONSTANTS.PAGE_SIZE
		}/${pageParam}?order=${
			_params?.sort_by ? _params?.sort_by : 'ASC'
		}&discount=false&brandArr=${encodeURIComponent(
			JSON.stringify(brands),
		)}&filter={"attribute_id":${JSON.stringify(
			Object.keys(filters),
		)},"selectedFilters":${encodeURIComponent(JSON.stringify(flatArray))}}`,
	);
	return { data };
};

const useProductsQuery = (options: any) => {
	return useInfiniteQuery<any, Error>(
		[API_ENDPOINTS.CATEGORY_PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: (data) => {
				const { currentPage = 1, totalProducts } = data?.data;
				const lastPage = Math.ceil(totalProducts / CONSTANTS.PAGE_SIZE);
				return currentPage === lastPage ? undefined : currentPage + 1;
			},
		},
	);
};

export { useProductsQuery, fetchProducts };
