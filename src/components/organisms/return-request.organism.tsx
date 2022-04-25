import React, { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';

import { useUI } from '@/context/ui.context';
import Layout from '@/organisms/layout/layout.layout';
import Input from '../atoms/input.atom';
import { useToasts } from 'react-toast-notifications';
import { submitReturnRequest } from '@/api/api.api';
import { getAccessToken } from '../../services/token.service';
import { back } from '@/helpers/scripts.helpers';

const ReturnRequest = () => {
	const { orderDetails } = useUI();
	const { addToast } = useToasts();
	const [selectedOption, setSelectedOptions] = useState<any>([]);
	const [serialNumber, setSerialNumber] = useState('');
	const [returnSerial, setReturnSerial] = useState(['']);
	const returnOptions = [
		{ label: 'Physical Damage', value: 1 },
		{ label: 'Wrong Product Delivered', value: 2 },
	];
	const [selectedQuantity, setSelectedQuantity] = useState<any>([]);
	const [quantityOptions, setQuantityOptions] = useState([]);

	useEffect(() => {
		if (orderDetails?.quantity > 1) {
			let quantityArray = [];
			for (let i = 1; i <= orderDetails.quantity; i++) {
				let obj = { label: `${i}`, value: i };
				quantityArray.push(obj);
			}
			setQuantityOptions(quantityArray);
		} else {
			setSelectedQuantity({ label: `1`, value: 1 });
		}
	}, []);

	const onSubmit = () => {
		if (selectedOption.length === 0) {
			addToast('Please select reason for return');
			return;
		}
		for (let s of returnSerial) {
			if (!s || s === '') {
				addToast('Please enter serial number');
			}
		}
		const data = {
			orderId: orderDetails.orderId,
			shipmentNo: orderDetails.shipment,
			serialNos: returnSerial,
			remarks: selectedOption?.[0]?.label,
			status: 'RETURN REQUESTED',
		};
		const token = getAccessToken();
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
		submitReturnRequest(data, headers, (err, data) => {
			if (err) {
				addToast('Something happenend. Please try again!');
			} else {
				if (data.status === 'error') {
					addToast(data?.msg);
				} else {
					addToast(
						'Request submitted. Replacement subject to approval.',
					);
					setTimeout(() => {
						back(window);
					}, 2000);
					// Success
				}
			}
		});
	};

	const addSerial = (qty) => {
		let returnSerial = [];
		for (let i = 1; i <= qty[0].value; i++) {
			returnSerial.push('');
		}
		setReturnSerial(returnSerial);
	};

	const renderReturnQuantity = () => {
		return (
			<div className="flex w-270 mt-20">
				<Select
					options={quantityOptions}
					placeholder={'Choose The Return Quantity'}
					values={selectedQuantity}
					onChange={(values) => addSerial(values)}
					style={{ width: 270 }}
				/>
			</div>
		);
	};

	const handleChange = (value, i) => {
		let returnSeria;
		returnSeria = [...returnSerial];
		returnSeria[i] = value;
		setReturnSerial(returnSeria);
	};

	return (
		<Layout webBack={false} title="Return Request">
			<div className="w-270 m-20 mt-0">
				<div className="flex w-270">
					<Select
						options={returnOptions}
						placeholder={'Select Reason For Return'}
						values={selectedOption}
						onChange={(values) => setSelectedOptions(values)}
						style={{ width: 270 }}
					/>
				</div>
				{orderDetails?.quantity > 1 && renderReturnQuantity()}
				{returnSerial.map((_, i) => {
					return (
						<div className="p-5 bg-white mt-20">
							<Input
								placeholderKey="Enter Serial Number Of Item"
								name="serialNumber"
								onChange={(e) =>
									handleChange(e?.target?.value, i)
								}
							/>
						</div>
					);
				})}
				<div
					className="fixed bottom-0 bg-blue-primary w-full left-0 h-40 text-white flex justify-center items-center text-14 font-semibold leading-21"
					onClick={onSubmit}
				>
					Submit
				</div>
			</div>
		</Layout>
	);
};

export default ReturnRequest;
