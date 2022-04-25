import React from 'react';

const OrderId = (props: { orderId: number; orderDate: string }) => {
	return (
		<div className="border-b border-grey-stroke px-16 pb-16">
			<div className="text-14 font-semibold text-grey-text pb-10">
				Order Id:{' '}
				<span className="text-14 font-medium text-black">
					{props.orderId}
				</span>
			</div>
			<div className="text-14 font-semibold text-grey-text">
				Order Date:{' '}
				<span className="text-14 font-medium text-black">
					{props.orderDate}
				</span>
			</div>
		</div>
	);
};

export default OrderId;
