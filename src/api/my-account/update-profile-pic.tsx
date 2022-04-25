import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import * as gtag from '../../services/gtag.service';
import axoisInstance from '@/services/http.service';
import { useGetUserDetails } from './use-get-user-details';
import { useAuth } from '@/context/auth.context';

async function updateProfilePic(input: any) {
	const response = await axoisInstance.put(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.UPDATE_PROFILE_PIC}`,
		input,
	);
	return response;
}

export const useUpdateProfilePicMutation = () => {
	const { addToast } = useToasts();
	const { refetch } = useGetUserDetails();
	const { session } = useAuth();
	return useMutation((input: any) => updateProfilePic(input), {
		onSuccess: (data) => {
			if (data?.data?.status === 'success') {
				refetch();
				addToast('Profile picture is updated');
				gtag.event({
					action: 'success_upload_profile_pic',
					category: 'success_upload_profile_pic',
					label: 'success_upload_profile_pic',
					value: JSON.stringify(session?.username),
				});
			} else {
				addToast('Something went wrong. Try again!');
				gtag.event({
					action: 'error_upload_profile_pic',
					category: 'error_upload_profile_pic',
					label: 'error_upload_profile_pic',
					value: JSON.stringify(
						`${data?.data?.msg} ${session?.username}`,
					),
				});
			}
		},
		onError: (data) => {
			addToast('Network Error.');
			gtag.event({
				action: 'network_error_upload_profile_pic',
				category: 'network_error_upload_profile_pic',
				label: 'network_error_upload_profile_pic',
				value: JSON.stringify(`${data}${session?.username}`),
			});
		},
	});
};
