// UPI works in prod only
// NB needs reverse proxy (already working)
// Debit card works directly with the cashfree api.
import qs from 'qs';
import axios from 'axios';

const ENV = process.env.NEXT_PUBLIC_ENV;

console.log('ENV>>', ENV);

const CASHFREE_DOMAINS = {
	DEVO: 'http://devo.gocashfree.com',
	TEST: 'https://test.cashfree.com',
	PROD: 'https://www.cashfree.com',
};

const HASH_URLs = {
	TEST: 'https://test2.arzooo.com/cashfree',
	PROD: 'https://m.arzooo.com/cashfree',
};

const headers = {
	'Content-Type': 'application/json',
};

const headersUpi = {
	'Content-Type': 'multipart/form-data',
};

function getBaseUrlForHash(mode = ENV) {
	return HASH_URLs[mode] || CASHFREE_DOMAINS[mode];
}

function getBaseUrl(mode = ENV) {
	let baseUrl = CASHFREE_DOMAINS[mode];
	if (mode !== 'PROD') baseUrl = `${baseUrl}/billpay`;
	return baseUrl;
}

function getPaymentHashGenerateUrl(mode, useArzoooProxy) {
	let baseUrl = getBaseUrl(mode);
	if (useArzoooProxy) {
		baseUrl = getBaseUrlForHash(mode);
	}
	return `${baseUrl}/checkout/post/generate-paymenthash`;
}

function getPaymentUpiUrl(mode) {
	return getBaseUrl(mode) + '/checkout/post/submit';
}

function BuildPaymentUrlWithHash(mode) {
	return getBaseUrl(mode) + '/checkout/post/payment';
}

function makeCorsRequest(url, data, callback) {
	return axios
		.post(url, data, { headers: headers })
		.then((response) => {
			const payment_url =
				BuildPaymentUrlWithHash(ENV) + '/' + response.data.paymentHash;
			return {
				status: 'success',
				msg: 'payment url generation successfull',
				url: payment_url,
			};
		})
		.catch((error) => {
			console.log(error);
			return {
				status: 'error',
				error: error,
				msg: 'cashfree api failed',
			};
		});
}

function makeUpiCorsRequest(url, data, callback) {
	return axios
		.post(url, data)
		.then((response) => {
			if (response.data.status === 'ERROR')
				return {
					status: 'error',
					msg: 'Try creating the order again',
					url: response.data.link,
				};
			else
				return {
					status: 'success',
					msg: response.data.message,
					url: response.data.link,
				};
		})
		.catch((error) => {
			return {
				status: 'error',
				error: error,
				msg: 'cashfree api failed',
			};
		});
}

function paySeamless(request, type) {
	var inputList = [
		'appId',
		'orderId',
		'orderAmount',
		'customerName',
		'customerEmail',
		'customerPhone',
		'notifyUrl',
		'returnUrl',
		'paymentToken',
		'paymentOption',
		'orderNote',
		'pc',
		'orderCurrency',
		'vendorSplit',
		'source',
		'upiMode',
		'responseType',
		'signature',
		'secretKey',
	];
	let paymentForm = {};
	for (var i = 0; i < inputList.length; i++) {
		var inputName = inputList[i];
		if (inputName in request) {
			paymentForm[inputName] = request[inputName];
		}
	}

	//check for paymentOption
	var payOption = request.paymentOption;
	// let formdata = new FormData();

	if (['card', 'wallet', 'nb', 'upi', 'paypal'].includes(payOption)) {
		var requestObj = request[payOption];
		for (var property in requestObj) {
			if (requestObj.hasOwnProperty(property)) {
				var propertyId = 'cf_' + payOption + '_' + property;
				var propertyName = payOption + '_' + property;
				paymentForm[propertyName] = requestObj[property];
			}
		}

		// Object.keys(paymentForm).map(data => {
		//   formdata.append(data, paymentForm[data]);
		// });

		// generatePaymentHash(paymentForm);

		if (type === '') {
			const useArzoooProxy = request.paymentOption === 'nb'; // only for netbanking
			return makeCorsRequest(
				getPaymentHashGenerateUrl(ENV, useArzoooProxy),
				paymentForm,
			);
		} else {
			return makeUpiCorsRequest(
				getPaymentUpiUrl(ENV),
				qs.stringify(paymentForm),
			);
		}
	}
}

const CashFree = {
	paySeamless,
};

export default CashFree;
