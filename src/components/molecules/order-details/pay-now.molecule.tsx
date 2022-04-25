import React from 'react';

import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';
import Rupee from '@/components/atoms/rupee.atom';
import ImageFile from '@/components/atoms/image.atom';
import { payNow } from '@/helpers/scripts.helpers';
import { useUserAccess } from '@/api/others/feature-access.api';
import Spinner from '@/components/atoms/spinner.atom';

const Paynow = (props: {
	mop: string;
	status: string;
	paid: number;
	due: number;
	deliveryPartner: string;
	orderDetail: CommonTypes.OrderDetailsType;
	orderId: any;
	shipment: any;
}) => {
	const { data: userData, isLoading, error } = useUserAccess();

	const data = {
		isFromShipment: true,
		shipment: props.shipment,
		orderId: props.orderId,
		orderAmount: props.orderDetail?.due,
		totalOrderAmount: props.orderDetail?.due,
		shipmentsData: [
			{
				orderId: Number(props.orderId),
				shipmentNumber: Number(props.shipment),
			},
		],
	};

	function checkMop(name) {
		if (name === ORDER_CONSTANTS.COD) return 'Pay on Delivery';
		else if (
			name === ORDER_CONSTANTS.CUSTOMER_PARTIAL_PAY ||
			name === ORDER_CONSTANTS.P_PAY
		)
			return 'Partial pay';
		else if (name === ORDER_CONSTANTS.CUSTOMER_PREPAID) return 'Prepaid';
		else if (name === 'partial-payment-wallet') return 'Partial Pay Wallet';
		else if (name === ORDER_CONSTANTS.CASH_FREE) return 'PREPAID';
		else if (name === ORDER_CONSTANTS.PREPAID_BY_UTR)
			return 'BANK TRANSFER';
		else {
			return name;
		}
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="border-b border-grey-stroke p-16">
			<div className="text-14 leading-21 font-semibold">
				Paid thru:{' '}
				<span className="text-blue-primary pl-6">
					{checkMop(props.mop)}
				</span>
			</div>
			{(props.mop === 'P_PAY' || props.mop === 'POD') &&
			(props.status === ORDER_CONSTANTS.SHIPPED ||
				props.status === ORDER_CONSTANTS.DELIVERED ||
				props.status === ORDER_CONSTANTS.OUT_FOR_DELIVERY_STATUS) ? (
				<>
					{ORDER_CONSTANTS.P_PAY ? (
						<div className="text-14 font-semibold pt-4 leading-20">
							Paid Online:
							<Rupee
								money={Math.ceil(props.paid)}
								className="pl-6 text-15 font-bold leading-24"
							/>
						</div>
					) : null}
					<div className="text-14 font-semibold pt-4 leading-20">
						Pay on delivery:
						<Rupee
							money={Math.ceil(props.due)}
							className="pl-6 text-15 font-bold leading-24"
						/>
					</div>
					{props.due > 0 &&
					props.deliveryPartner === 'ARZOOO_EXPRESS' ? (
						<div
							onClick={() => payNow(window, data)}
							className="border border-grey-stroke mt-10 rounded-6 flex justify-between items-center px-16 py-10 shadow-2"
						>
							<div className="text-16 font-semibold">
								PAY
								<Rupee
									money={Math.ceil(props.due)}
									className="px-6 text-15 font-bold leading-24"
								/>
							</div>
							<ImageFile src="Right.svg" width={24} height={24} />
						</div>
					) : (
						<div className="text-14 mt-14 font-semibold">
							Please make the payment to the respective delivery
							partner at the time of delivery
						</div>
					)}
				</>
			) : null}
		</div>
	);
};

export default Paynow;
