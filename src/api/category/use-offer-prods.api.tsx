import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';

async function useProducts(input: any, page, router) {
	if (router?.query?.id) {
		const response = await axoisInstance.post(
			`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.OFFER_PRODS}?isFalcon=0&page=${page}&id=${router?.query?.id}`,
			input,
		);
		return response;
	}
}

export const useOfferProductsMutation = (page) => {
	const { addToast } = useToasts();
	const router = useRouter();
	return useMutation((input: any) => useProducts(input, page, router), {
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (data) => {},
	});
};
