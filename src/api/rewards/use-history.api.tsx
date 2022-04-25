import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import { RewardHistoryType } from '@/helpers/types.helpers';
import axoisInstance from '@/services/http.service';

async function history(input: RewardHistoryType) {
	const response = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.TRANSACTION_HISTORY}`,
		input,
	);
	return response;
}

export const useHistoryMutation = () => {
	const { addToast } = useToasts();

	return useMutation((input: RewardHistoryType) => history(input), {
		onSuccess: (data) => {},
		onError: (data) => {
			addToast('Network Error.');
		},
	});
};
