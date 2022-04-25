import React from 'react';

import Orders from '@/atoms/orders.atom';
import UpdateStatus from '../../atoms/status.atom';

const Wip = ({ data }) => {
	if (data?.length <= 0) {
		return (
			<UpdateStatus
				text="No Orders Found"
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-14 leading-21 font-semibold"
			/>
		);
	}

	return (
		<>
			{data?.map((order: CommonTypes.OrdersDataType) => {
				return <Orders key={order.orderId} order={order} />;
			})}
		</>
	);
};

export default Wip;
