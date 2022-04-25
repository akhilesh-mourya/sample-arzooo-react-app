import { useMutation } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

import { API_ENDPOINTS } from '@/api/utils/api-endpoints.api';
import axoisInstance from '@/services/http.service';
import { useUI } from '@/context/ui.context';
import { MOP, PAY_THRU } from '@/helpers/persistent.helpers';
import { ROUTES } from '@/helpers/routes.helpers';
import { backFromPayment, setEpayCookie } from '@/helpers/scripts.helpers';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import moment from 'moment';

async function submitPayment(
	orderData: any,
	fromShipment: boolean,
	isFromCredit: boolean = false,
) {
	const data = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${
			fromShipment
				? API_ENDPOINTS.CREDIT_PAYMENT_SHIPMENTS
				: API_ENDPOINTS.CREDIT_PAYMENT_ORDER
		}`,
		orderData,
	);
	return data.data;
}

async function finboxSessionApi(data, router) {
	const response = await axoisInstance.post(
		`${process.env.NEXT_PUBLIC_MAIN}${API_ENDPOINTS.FINBOX_SESSION}`,
		data,
	);
	if (response.data.status === 'success') {
		let url = response.data.body.data.url;
		router.push(url);
	}
}

async function encrypt(obj) {
	return new Promise(async (resolve) => {
		const iv = new (Buffer as any).from('94A150D23F2A99BA'); //(null) iv
		const password = '9132FDD02ABAABF7D3A0B4BE8B2D5F77';
		const Key = CryptoJS.enc.Utf8.parse(password); // 1. Replace C by CryptoJS
		const IV = CryptoJS.enc.Utf8.parse(iv);
		const encryptedText = CryptoJS.AES.encrypt(JSON.stringify(obj), Key, {
			iv: IV,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		const encrypted_data = encryptedText.toString(CryptoJS.format.Base64);

		const hash = crypto
			.createHash('sha256')
			.update(JSON.stringify(obj))
			.digest('hex');

		const data = {
			encrypted_data: encrypted_data,
			hash: hash,
		};
		resolve(data);
	});
}

async function epayCall(data, router, onEpayPayment: Function) {
	const date = moment().format();
	const obj = {
		redirectType: 'WEBPAGE',
		marketplaceOrderId: Math.floor(Math.random() * 87675252444), //`${data.appPayId}`,
		mCode: 'seller_dev',
		callbackUrl: 'https://test3.arzooo.com/epaylater/epaycallback',
		customerEmailVerified: false,
		customerTelephoneNumberVerified: true,
		customerLoggedin: true,
		amount: 87000, //data.transactionAmount * 100,
		currencyCode: 'INR',
		date: date,
		category: 'RETAIL',
		customer: {
			firstName: '',
			lastName: '',
			emailAddress: 'vipinele9026@gmail.com', //data.email,
			telephoneNumber: '8788314898', //data.mobile,
			gender: '',
			dob: '',
		},
		device: {
			deviceType: 'MOBILE',
			deviceClient:
				'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
			deviceNumber: '202.56.215.28',
			deviceId: '00:15:E9:2B:99:3C',
			deviceMake: 'Apple iPhone',
			deviceModel: '7 Plus',
			IMEINumber: '351756051523999',
			osVersion: 'iOS 10.2.1',
		},
		location: {
			latitude: '',
			longitude: '',
			accuracy: '',
		},
	};
	const encdata = await encrypt(obj);
	const encodedData = {
		checksum: encdata.hash.toUpperCase(),
		encdata: encdata.encrypted_data,
	};
	setEpayCookie(window, encodedData);
}

export const usePaymentMutation = (
	fromShipment: boolean,
	upiMethods,
	isFromCredit: boolean = false,
	onEpayPayment?: Function,
) => {
	const { addToast } = useToasts();
	const router = useRouter();
	const { mop, payThru } = useUI();

	return useMutation(
		(orderData: any) =>
			submitPayment(orderData, fromShipment, isFromCredit),
		{
			onSuccess: (data) => {
				if (data?.status === 'success') {
					if (
						mop === MOP.POD ||
						data.msg === 'Wallet payment completed!'
					) {
						router.push(`${ROUTES.PAYMENTS_STATUS}/success`);
					} else if (mop === MOP.CREDIT) {
						if (payThru === PAY_THRU.BLACKSOIL) {
							addToast(data?.msg);
							setTimeout(() => {
								router.push(
									`${ROUTES.PAYMENTS_STATUS}/success`,
								);
								setTimeout(() => {
									backFromPayment(window, 'payment_success');
								}, 2500);
							}, 500);
						} else if (payThru === PAY_THRU.RUPIFI) {
							router.push(data?.data?.redirectingUrl);
						} else if (payThru === PAY_THRU.FINBOX) {
							let reqData = {
								finboxId: data.data.finboxId,
								redirectURL:
									process.env.NEXT_FINBOX_REDIRECT_URL,
								withdrawAmount: data.data.txnAmount,
								transactionID: data.data.orderId,
							};
							finboxSessionApi(reqData, router);
						} else if (payThru === PAY_THRU.EPAYLATER) {
							epayCall(data?.data, router, onEpayPayment); // Added Here to test
							// let cookie = data?.data?.headers['set-cookie'][0];
							// const currAuth = cookie.split(';');
							// const psid = currAuth[0].split('=');
							// const cookieData = {
							// 	name: 'PSID',
							// 	value: psid[1],
							// 	domain: 'epaylater.in',
							// 	path: '/',
							// 	version: '1',
							// 	httpOnly: true,
							// 	secure: true,
							// };
							// setEpayCookie(window, cookieData); // Sending event to mobile side to set cookies
							// setTimeout(() => {
							// 	router.push({
							// 		pathname: ROUTES.EPAY_PAYMENT,
							// 		query: {
							// 			htmlToLoad: data?.data?.data,
							// 			path: ROUTES.EPAY_PAYMENT,
							// 		},
							// 	});
							// }, 500);
						}
					} else if (payThru === PAY_THRU.UPI || payThru === '') {
						upiMethods(data?.data?.data?.payload);
					} else {
						window.location.href = data?.data?.data?.url;
					}
				} else {
					addToast(data?.msg);
				}
			},
			onError: (data) => {
				addToast('Network Error.');
			},
		},
	);
};
