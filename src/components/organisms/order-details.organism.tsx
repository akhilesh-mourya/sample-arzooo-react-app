import React from 'react';
import { useRouter } from 'next/router';

import { useOrderDetails } from '@/api/my-orders/use-order-details.api';
import Spinner from '../atoms/spinner.atom';
import UpdateStatus from '../atoms/status.atom';
import OrderId from '@/molecules/order-details/order-id.molecule';
import Details from '@/molecules/order-details/order-details.molecule';
import Track from '@/molecules/order-details/order-track.molecule';
import TrackShipmentStatus from '@/molecules/order-details/track-shipment-status.molecule';
import InvoiceDownload from '@/molecules/order-details/download-invoice.molecule';
import PriceBreakups from '@/molecules/order-details/price-breakup.molecule';
import Return from '@/molecules/order-details/return.molecule';
import Paynow from '@/molecules/order-details/pay-now.molecule';

const OrderDetails = () => {
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, isError } = useOrderDetails({ ...query });
	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return (
			<UpdateStatus
				text="Error Occurred!"
				className="my-20 text-center text-14 leading-21 text-red"
			/>
		);
	}

	return (
		<div className="pt-16 bg-white">
			<OrderId
				orderId={data?.data?.[0]?.orderId}
				orderDate={data?.data?.[0]?.orderDate}
			/>
			<Details
				img={data?.data?.[0]?.displayImage}
				displayName={data?.data?.[0]?.displayName}
				modelName={data?.data?.[0]?.modelName}
				quantity={data?.data?.[0]?.quantity}
			/>
			<Track
				status={data?.data?.[0]?.orderStatus}
				statusDate={data?.data?.[0]?.statusDate}
				remarks={data?.data?.[0]?.remarks}
				deliveryPartner={data?.data?.[0]?.deliveryPartner}
			/>
			<TrackShipmentStatus orderData={data?.data?.[0]} />
			<Paynow
				mop={data?.data?.[0]?.mop}
				status={data?.data?.[0]?.orderStatus}
				paid={data?.data?.[0]?.paid}
				due={data?.data?.[0]?.due}
				deliveryPartner={data?.data?.[0]?.deliveryPartner}
				orderDetail={data?.data?.[0]}
				orderId={query?.id}
				shipment={query?.shipment}
			/>
			{data?.data?.[0]?.orderStatus === 'DELIVERED' ? (
				<InvoiceDownload
					invoicePDF={data?.data?.[0]?.invoicePDF}
					orderId={query?.id}
					shipment={query?.shipment}
				/>
			) : null}
			{data?.data?.[0]?.returnEligible ? (
				<Return
					orderDetail={data?.data?.[0]}
					shipment={query?.shipment}
				/>
			) : null}
			<PriceBreakups
				total={data?.data?.[0]?.totalAmount}
				shipping={data?.data?.[0]?.shippingPrice}
				unit={data?.data?.[0]?.unitPrice}
			/>
		</div>
	);
};

export default OrderDetails;
