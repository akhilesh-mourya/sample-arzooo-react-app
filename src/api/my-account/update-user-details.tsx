import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import * as gtag from '../../services/gtag.service';
import axoisInstance from '@/services/http.service';
import { ROUTES } from '@/helpers/routes.helpers';
import { useGetUserDetails } from './use-get-user-details';

async function updateUserProfile(input: any) {
	const { data } = await axoisInstance.put(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.UPDATE_USER_DETAILS}`,
		input,
	);
	return data;
}

export const useUpdateUserProfileMutation = () => {
	const { addToast } = useToasts();
	const router = useRouter();
	const { refetch } = useGetUserDetails();
	return useMutation((input: any) => updateUserProfile(input), {
		onSuccess: (data) => {
			if (data?.status === 'success') {
				gtag.event({
					action: 'success_update_details',
					category: 'success_update_details',
					label: 'success_update_details',
					value: JSON.stringify(data),
				});
				addToast('Profile updated successfully.');
				router.push(ROUTES.MY_ACCOUNT).then((res) => {
					refetch();
				});
			} else {
				addToast('Something went wrong. Try after sometime');
				gtag.event({
					action: 'error_update_details',
					category: 'error_update_details',
					label: 'error_update_details',
					value: JSON.stringify(data),
				});
			}
		},
		onError: (data) => {
			addToast('Network Error.');
			gtag.event({
				action: 'network_error_update_details',
				category: 'network_error_update_details',
				label: 'network_error_update_details',
				value: JSON.stringify(data),
			});
		},
	});
};
