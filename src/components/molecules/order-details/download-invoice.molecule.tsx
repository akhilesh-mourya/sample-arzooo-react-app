import React from 'react';

import ImageFile from '@/atoms/image.atom';
import { downloadInvoice } from '@/helpers/scripts.helpers';

const DownloadInvoice = (props: {
	invoicePDF: string;
	orderId: any;
	shipment: any;
}) => {
	let data = {
		orderId: props.orderId,
		shipment: props.shipment,
	};
	return (
		<a
			download
			target="_blank"
			href={`${process.env.NEXT_PUBLIC_PATH}/images/sales_invoice/${props.invoicePDF}`}
			className="border-b border-grey-stroke p-16 flex justify-between items-center"
			onClick={() => downloadInvoice(window, data)}
		>
			<span className="text-14 font-semibold leading-21">
				Download Invoice
			</span>
			<ImageFile src="Right.svg" width={24} height={24} />
		</a>
	);
};

export default DownloadInvoice;
