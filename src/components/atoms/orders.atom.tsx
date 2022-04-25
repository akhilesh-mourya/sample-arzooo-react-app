/**
 * Order Component
 * this component is used for order since the UI is similar
 *
 * Author: Vakadu Vinod
 */

import React from 'react';

import ImageFile from './image.atom';
import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';
import { pushOrderDetails } from '@/helpers/scripts.helpers';

const changeBgColor = (status) => {
	if (
		status === ORDER_CONSTANTS.RETURN_REJECTED ||
		status === ORDER_CONSTANTS.CANCELLED ||
		status === ORDER_CONSTANTS.REJECTED
	)
		return 'bg-red';
	else return 'bg-green';
};

const Orders = ({ order }) => {
	const data = {
		orderId: order.orderId,
		shipmentNo: order.shipmentNo,
	};

	const getStatusText = (status: string) => {
		if (status === ORDER_CONSTANTS.OUT_FOR_DELIVERY_STATUS)
			return ORDER_CONSTANTS.OUT_FOR_DELIVERY_LABEL;
		else return status.toLowerCase();
	};

	return (
		<div
			onClick={() => pushOrderDetails(window, data)}
			className="flex justify-between border-b border-grey-stroke p-16"
		>
			<div className="mr-8">
				<ImageFile
					local={false}
					src={`${process.env.NEXT_PUBLIC_PATH}/images/products/${order?.displayImage}`}
					width={80}
					height={60}
					objectFit="contain"
					placeholder="blur"
					blurDataURL={`/icons/placeholder_blur_loader.svg`}
				/>
			</div>
			<div className="flex-1 flex items-start">
				<div className="flex-1">
					<div className="text-12 mb-6">OrderID: {order.orderId}</div>
					<div className="text-14 leading-21 font-semibold">
						{order.displayName}
					</div>
					<div className="flex items-center">
						<span
							className={`w-8 h-8 rounded-full ${changeBgColor(
								order.orderStatus,
							)}`}
						/>
						<span className="capitalize text-12 leading-21 font-normal ml-4 mr-8">
							{getStatusText(order?.orderStatus)}
						</span>
						<span className="text-12 leading-21 font-normal">
							{order.orderStatusDate}
						</span>
					</div>
				</div>
				<ImageFile src="Right.svg" width={24} height={24} />
			</div>
		</div>
	);
};

export default Orders;
