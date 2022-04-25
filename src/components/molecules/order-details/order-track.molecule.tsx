import React from 'react';
import Steps from 'rc-steps';
import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';

const OrderTrack = (props: {
	status: string;
	statusDate: string;
	remarks: string;
	deliveryPartner: string;
}) => {
	function getCurrentPosition(status: string, isArzoooExpress: boolean) {
		switch (status) {
			case ORDER_CONSTANTS.APPROVED:
				return 0.9;
			case ORDER_CONSTANTS.CONFIRMED:
				return 0.9;
			case ORDER_CONSTANTS.PICKED:
				return 1.9;
			case ORDER_CONSTANTS.PACKED:
				return 1.9;
			case ORDER_CONSTANTS.SHIPPED:
				return 2.9;
			case ORDER_CONSTANTS.REJECTED:
				return 3.9;
			case ORDER_CONSTANTS.DELIVERED:
				return isArzoooExpress ? 4 : 3.9;
			case ORDER_CONSTANTS.RETURN_REQUESTED:
			case ORDER_CONSTANTS.RETURN_ACCEPTED:
				return isArzoooExpress ? 5 : 4;
			case ORDER_CONSTANTS.RETURN_REJECTED:
			case ORDER_CONSTANTS.OUT_FOR_DELIVERY_STATUS:
				return 3;
			case ORDER_CONSTANTS.RETURNED:
				return 6;
			default:
				return null;
		}
	}

	function getInitialSteps() {
		return (
			<>
				{renderChildStep(
					'Approved',
					props.status === ORDER_CONSTANTS.APPROVED ||
						props.status === ORDER_CONSTANTS.CONFIRMED
						? props.statusDate
						: '',
				)}
				{renderChildStep(
					'Packed',
					props.status === ORDER_CONSTANTS.PICKED ||
						props.status === ORDER_CONSTANTS.PACKED
						? props.statusDate
						: '',
				)}
				{renderChildStep(
					'Shipped',
					props.status === ORDER_CONSTANTS.SHIPPED
						? props.statusDate
						: '',
				)}
			</>
		);
	}

	function getReturnRequestSteps() {
		return (
			<>
				{renderChildStep(
					'Return Requested',
					props.status === ORDER_CONSTANTS.RETURN_REQUESTED
						? props.statusDate
						: '',
				)}
			</>
		);
	}

	function getReturnAcceptedSteps() {
		return (
			<>
				{renderChildStep(
					'Returned',
					props.status === ORDER_CONSTANTS.RETURN_ACCEPTED
						? props.statusDate
						: '',
				)}
			</>
		);
	}

	function getReturnAcceptedSuccessSteps() {
		return (
			<>
				{renderChildStep(
					'Returned',
					props.status === ORDER_CONSTANTS.RETURNED
						? props.statusDate
						: '',
				)}
			</>
		);
	}

	function getProgressSteps() {
		console.log(props.status);

		if (props.deliveryPartner === ORDER_CONSTANTS.ARZOOO_EXPRESS) {
			return (
				<>
					{getInitialSteps()}
					{renderChildStep(
						'Out For Delivery',
						props.status === ORDER_CONSTANTS.OUT_FOR_DELIVERY_STATUS
							? props.statusDate
							: '',
					)}
					{renderChildStep(
						'Delivered',
						props.status === ORDER_CONSTANTS.DELIVERED
							? props.statusDate
							: '',
					)}
					{props.status === ORDER_CONSTANTS.RETURN_REQUESTED &&
						getReturnRequestSteps()}
					{props.status === ORDER_CONSTANTS.RETURN_ACCEPTED &&
						getReturnAcceptedSteps()}
					{props.status === ORDER_CONSTANTS.RETURNED &&
						getReturnAcceptedSuccessSteps()}
				</>
			);
		} else {
			return (
				<>
					{getInitialSteps()}
					{renderChildStep(
						'Delivered',
						props.status === ORDER_CONSTANTS.DELIVERED
							? props.statusDate
							: '',
					)}
					{props.status === ORDER_CONSTANTS.RETURN_REQUESTED &&
						getReturnRequestSteps()}
					{props.status === ORDER_CONSTANTS.RETURN_ACCEPTED &&
						getReturnAcceptedSteps()}
				</>
			);
		}
	}

	function renderChildStep(title: string, description: string) {
		return <Steps.Step title={title} description={description} />;
	}
	console.log(
		getCurrentPosition(
			props.status,
			props.deliveryPartner === ORDER_CONSTANTS.ARZOOO_EXPRESS,
		),
	);

	function renderStatus() {
		if (props.status === ORDER_CONSTANTS.CANCELLED) {
			return (
				<div className="text-black text-14 font-semibold">
					Item Cancelled on {props.statusDate}
				</div>
			);
		} else if (props.status === ORDER_CONSTANTS.REJECTED) {
			return (
				<div className="text-black text-14 font-semibold">
					Item is Rejected on {props.statusDate}
					{props.remarks && props.remarks !== '' && (
						<span className="block">Remarks: {props.remarks}</span>
					)}
				</div>
			);
		} else {
			return (
				<Steps
					direction="vertical"
					current={getCurrentPosition(
						props.status,
						props.deliveryPartner ===
							ORDER_CONSTANTS.ARZOOO_EXPRESS,
					)}
				>
					{getProgressSteps()}
				</Steps>
			);
		}
	}

	return (
		<div className="p-16 border-b border-grey-stroke">{renderStatus()}</div>
	);
};

export default OrderTrack;
