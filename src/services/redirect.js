import cashfree from './cashFree';

export default function redirect(paymentData, obj, mode) {
	const payment = {
		appId: paymentData.appId,
		orderId: paymentData.orderId,
		orderAmount: paymentData.orderAmount,
		customerName: paymentData.customerName,
		customerPhone: paymentData.customerPhone,
		customerEmail: paymentData.customerEmail,
		notifyUrl: paymentData.callbackUrl,
		returnUrl: paymentData.callbackUrl,
		orderNote: `Extra Note ${paymentData.orderId}`,
		orderCurrency: 'INR',
		paymentToken: paymentData.paymentToken,
		vendorSplit: paymentData.vendorSplit,
		source: 'woocommerce',
		paymentOption: mode,
	};
	if (mode === 'nb') {
		payment.nb = obj;
	}
	if (mode === 'card') {
		payment.card = obj;
	}
	if (mode === 'upi') {
		payment.upi = obj;
	}
	cashfree.paySeamless(payment).then((res) => {
		if (res.status === 'success') {
			window.location.href = res.url;
		}
	});
}
