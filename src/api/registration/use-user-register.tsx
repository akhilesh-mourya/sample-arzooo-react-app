import { useMutation } from 'react-query';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import { ROUTES } from '@/helpers/routes.helpers';
import * as gtag from '../../services/gtag.service';

async function registerUser(input: any) {
	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.USER_REGISTRATION}`,
		input,
	);
	return response;
}

export const useRegisterMutation = () => {
	const { addToast } = useToasts();
	const router = useRouter();
	return useMutation((input: any) => registerUser(input), {
		onSuccess: (data) => {
			if (data?.data?.status === 'success') {
				router.push(
					`${ROUTES.REGISTRATION_SUCCESS}?msg=${data.data.msg}`,
				);
			} else {
				addToast('Server is down. Please try again!');
			}
		},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
