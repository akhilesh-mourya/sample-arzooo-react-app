import { useQuery } from 'react-query';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useAuth } from '@/context/auth.context';

export const fetchEpayLaterUserStatus = async (id: Number) => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.EPAYLATER_USER_STATUS}${id}`,
	);
	return data;
};

export const fetchEpayLaterUserSummaryInfo = async (phone_number: Number) => {
	const { data } = await axoisInstance.get(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.EPAYLATER_USER_STATUS}${phone_number}`,
	);
	return data;
};

export const useEpayLaterUserStatus = () => {
	const { session } = useAuth();
	return useQuery<any, Error>([API_ENDPOINTS.EPAYLATER_USER_STATUS], () =>
		fetchEpayLaterUserStatus(session?.user_id),
	);
};

export const useEpayLaterUserSummaryInfo = () => {
	const { session } = useAuth();
	return useQuery<any, Error>([API_ENDPOINTS.EPAYLATER_USER_SUMMARY], () =>
		fetchEpayLaterUserSummaryInfo(session?.phone_number),
	);
};
