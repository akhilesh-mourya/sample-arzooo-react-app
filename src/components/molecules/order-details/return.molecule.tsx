import React from 'react';
import { useRouter } from 'next/router';

import ImageFile from '@/atoms/image.atom';
import { ROUTES } from '@/helpers/routes.helpers';
import { useUI } from '@/context/ui.context';

const Return = (props: {
	orderDetail: CommonTypes.OrderDetailsType;
	shipment: any;
}) => {
	const router = useRouter();
	const { setOrderDetails } = useUI();

	function returnItem() {
		let data = {
			...props.orderDetail,
			shipment: props.shipment,
		};
		setOrderDetails(data);
		router.push(ROUTES.RETURN_REQUEST);
	}

	return (
		<div
			onClick={returnItem}
			className="border-b border-grey-stroke p-16 flex justify-between items-center"
		>
			<div className="flex flex-col">
				<span className="text-14 font-semibold leading-21">
					Need help with with the item ?
				</span>
				<span className="text-14 font-semibold leading-21">
					Return Item
				</span>
			</div>
			<ImageFile src="Right.svg" width={24} height={24} />
		</div>
	);
};

export default Return;
