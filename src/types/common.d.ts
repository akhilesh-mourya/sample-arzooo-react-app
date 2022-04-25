declare namespace CommonTypes {
	type LoginDataType = {
		cod_payment: number;
		credit_payment: number;
		district_id: number;
		email: string;
		exp: number;
		iat: number;
		indifi_id: string;
		name: string;
		pad_payment: number;
		phone_number: number;
		role: string;
		seller_id: number;
		store_category: string;
		store_type: string;
		user_id: number;
		username: string;
		zone: string;
	};

	type ProfileDataType = {
		owner_name: string;
		mobile_number: string;
		email: string;
		dob: any;
		gender: string;
	};

	type OrdersDataType = {
		displayImage: string;
		displayName: string;
		estDelivery: string;
		orderId: number;
		orderStatus: string;
		orderStatusDate: string;
		payEnable: number;
		shipmentNo: number;
	};

	type OrderDetailsType = {
		deliveryPartner: string;
		displayImage: string;
		displayName: string;
		due: number;
		estDelivery: string;
		invoice: string;
		invoicePDF: string;
		modelName: string;
		mop: string;
		orderDate: string;
		orderId: number;
		orderStatus: string;
		paid: number;
		quantity: number;
		remarks: string;
		returnEligible: number;
		returnQuantity: number;
		shippingPrice: number;
		statusDate: string;
		totalAmount: number;
		trackingId: number;
		unitPrice: number;
	};

	type OrderDataType = {
		orderId: number;
		shipmentCharge: number;
		tcsCharge: number;
		storeType: string;
		orderAmount: number;
		totalOrderAmount: number;
		pod: number;
		pad: number;
		pPay: number;
		credit: number;
		finboxId: string;
		openCreditData: any;
		gstShipmentCharge: number;
		vpaDetails: {
			vpaNumber: string;
			vpaIfsc: string;
			vpaUpi: string;
		};
		walletData: {
			walletBalance: number;
			useableWalletBalance: number;
		};
		indifiData: any;
		finboxData: any;
		arzoooCreditData: {
			creditBalance: number;
			creditPartner: string;
			maxCreditLimit: number;
		};
		rupifiData: any;
		ePayLaterData: any;
		type: string;
	};

	type FirmInformationType = {
		firm_name: string;
		mobile_number: string;
		owner_name: string;
		email: string;
		pincode: string;
		city: string;
		state: string;
		address: string;
		referalcode: string;
	};

	type BusinessInfoType = {
		itemType: string;
		dropdownType: string;
		businessType: string;
		businessCategory: string;
		businessSale: string;
	};
}
