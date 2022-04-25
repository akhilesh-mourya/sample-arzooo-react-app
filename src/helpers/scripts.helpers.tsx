/**
 * Scripts
 * Mostly used for JS functions
 * Relation b/w app and webview
 *
 * Author: Vakadu Vinod
 */

// back function in app webview, window object global
export async function back(window) {
	window?.ReactNativeWebView?.postMessage('close');
}

// for giving user permissions, window object global
export async function grantPermissions(window) {
	window?.ReactNativeWebView?.postMessage('grant-permissions');
}

// order details paynow button, window object global
export async function payNow(window, details) {
	const data = {
		details,
		type: 'PAY_NOW',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// order details paynow button, window object global
export async function pushOrderDetails(window, details) {
	window?.ReactNativeWebView?.postMessage(JSON.stringify(details));
}

// add to cart, window object global
export async function addToCart(window, cartCount) {
	const data = {
		...cartCount,
		type: 'ADD_TO_CART',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// add to cart, window object global
export async function buyNow(window, details, prodObj) {
	const data = {
		details,
		prodObj,
		type: 'BUY_NOW',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// make cart payment, window object global
export async function payCart(window, details) {
	const data = {
		details,
		type: 'CART_PAYMENT',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// to product, window object global
export async function pushToProduct(window, details) {
	window?.ReactNativeWebView?.postMessage(JSON.stringify(details));
}

// to product, window object global
export async function shareProduct(window, details) {
	const data = {
		...details,
		type: 'SHARE',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// to product, window object global
export async function shareProductDeal(window, details) {
	const data = {
		...details,
		type: 'SHARE_DEAL',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

// to cart page, window object global
export async function handleCart(window, details) {
	const data = {
		...details,
		type: 'CART',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for downloading invoice in payment history
export async function downloadInvoice(window, details) {
	let data = {
		...details,
		type: 'DOWNLOAD_INVOICE',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for handling sub cagtegories in list of categories
export async function handleSubCat(window, cat) {
	window?.ReactNativeWebView?.postMessage(JSON.stringify(cat));
}

//this is used for payment page
export async function handleRedirection(window, page) {
	window?.ReactNativeWebView?.postMessage(page);
}

export async function backFromPayment(window, status = 'payment_success') {
	window?.ReactNativeWebView?.postMessage(status);
}

export async function goToCreditOnboarding(window) {
	window?.ReactNativeWebView?.postMessage('go_to_credit_onboarding');
}

export async function setEpayCookie(window, details) {
	const data = {
		cookieData: details,
		type: 'set_epay_cookie',
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for handling upi payments
export async function setUpiPayment(window, url, name, payment) {
	const data = {
		url,
		name,
		type: 'UPI_TYPE',
		paymentData: payment,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

export async function goToCreditScreen(window) {
	window?.ReactNativeWebView?.postMessage('go_to_credit_screen');
}

//for handling upi payments
export async function upiPayment(window, upiData, payment) {
	const data = {
		upiData,
		type: 'TYPE_UPI',
		paymentData: payment,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for handling prepaid payments
export async function prepaidPayment(window, prepaidData, payment) {
	const data = {
		prepaidData,
		type: 'TYPE_PREPAID',
		paymentData: payment,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for handling event page banners
export async function openBanner(window, id, is_falcon) {
	const data = {
		id,
		type: 'BANNERS',
		is_falcon: is_falcon ? is_falcon : 0,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for handling product page
export async function openProductPage(window, title, hash) {
	const data = {
		type: 'PRODUCT',
		title,
		hash,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for events during adding to cart
export async function addToCartEvents(window, eventData) {
	const data = {
		type: 'ADD_TO_CART_EVENTS',
		eventData,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(data));
}

//for generic event
export async function logTheEvent(window, data) {
	const evData = {
		type: 'GENERIC_EVENT',
		data,
	};
	window?.ReactNativeWebView?.postMessage(JSON.stringify(evData));
}
