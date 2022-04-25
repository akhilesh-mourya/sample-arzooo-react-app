import React, { useState } from 'react';
import { ORDER_CONSTANTS } from '@/helpers/persistent.helpers';
import { fetchOrderTrackStatus } from '@/api/api.api';
import { useToasts } from 'react-toast-notifications';
import { getOrderTrackStatusMapping } from '@/helpers/utils.helpers';

const TrackShipmentStatus = (props: { orderData: any }) => {
	const [trackData, setTrackData] = useState(null);
	const { addToast } = useToasts();
	const getTrackingStatus = () => {
		fetchOrderTrackStatus(props.orderData.trackingId, (err, data) => {
			if (err) {
				addToast('Something happenend. Please try again!');
			} else {
				if (data && data.data && data.data.length > 0) {
					const trackData = data.data[0];
					const _date = trackData.timestamp.split(' ');
					const _time = _date[1].split(':');
					let statusData = {
						city: trackData.location,
						status: getOrderTrackStatusMapping(trackData.status),
						currDate: _date[0],
						currTime: `${_time[0]}:${_time[1]} ${_date[2]}`,
					};
					setTrackData(statusData);
				}
			}
		});
	};
	const renderTrackButton = () => {
		return (
			<div
				onClick={() => {
					getTrackingStatus();
				}}
				className="bg-blue-primary items-center justify-center my-10 p-8 flex"
			>
				<span className="capitalize text-12 leading-21 font-normal text-white flex-1 text-center">
					Track Shipment Status
				</span>
			</div>
		);
	};
	const renderTrackingStatus = () => {
		return (
			<div className="border border-grey-stroke m-10 p-10 flex-1">
				<div className="flex justify-around w-100%">
					<div className=" border-grey-stroke h-30 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black flex-1 text-center">
							Date & Time
						</span>
					</div>
					<div className=" border-grey-stroke h-30 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black flex-1 text-center">
							City
						</span>
					</div>
					<div className=" border-grey-stroke h-30 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black flex-1 text-center">
							Status
						</span>
					</div>
				</div>
				<div className="flex justify-around w-100%">
					<div className="border-grey-stroke h-40 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black text-center flex width-100% self-center">
							{trackData.currDate}
							{` `}
						</span>
						<span className="capitalize text-12 leading-21 font-normal text-black text-center flex width-100% self-center">
							{trackData.currTime}
						</span>
					</div>
					<div className=" border-grey-stroke h-40 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black flex-1 text-center">
							{trackData.city}
						</span>
					</div>
					<div className=" border-grey-stroke h-40 w-33%">
						<span className="capitalize text-12 leading-21 font-normal text-black flex-1 text-center">
							{trackData.status}
						</span>
					</div>
				</div>
			</div>
		);
	};
	const renderTrackView = () => {
		return (
			<div className="border-b border-grey-stroke">
				{trackData === null && renderTrackButton()}
				{trackData && renderTrackingStatus()}
			</div>
		);
	};
	return (
		<>
			{props.orderData &&
			(props.orderData.orderStatus === ORDER_CONSTANTS.SHIPPED ||
				props.orderData.orderStatus ===
					ORDER_CONSTANTS.OUT_FOR_DELIVERY_STATUS) &&
			(props.orderData.deliveryPartner ===
				ORDER_CONSTANTS.ARZOOO_EXPRESS ||
				props.orderData.deliveryPartner === ORDER_CONSTANTS.DELHIVERY)
				? renderTrackView()
				: null}
		</>
	);
};

export default TrackShipmentStatus;
