import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import Input from '@/atoms/input.atom';
import Button from '@/atoms/button.atom';
import Clipboard from '@/atoms/copyToClipboard';
import Header from '../header';

const Id = () => {
	let url;
	const router = useRouter();
	const { addToast } = useToasts();
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [msg, setMsg] = useState('');
	const inputRef = useRef(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid, dirtyFields },
	} = useForm({
		mode: 'onSubmit',
	});

	useEffect(() => {
		url = window.location.href;
	}, []);

	const onSubmit = (data, e) => {
		const { customerMobile, amount } = data;
		setLoading(true);
		let submitData = {
			amount,
			username: router.query.username,
			customerMobile,
		};

		axios
			.post(
				`${process.env.NEXT_PUBLIC_MAIN}/payment/store/create_custom_payment/cash_free`,
				submitData,
			)
			.then((response) => {
				if (response.data.status === 'success') {
					e.target.reset();
					reset();
					addToast(
						`Arzooo Pay Request Sent Successfully to ${customerMobile}`,
						{
							appearance: 'success',
							autoDismiss: true,
						},
					);
					let paymentLink = response.data.data.paymentObj.paymentLink;
					setLoading(false);
					setShow(true);
					setMsg(paymentLink);
				} else {
					setLoading(false);
					addToast(response.data.msg, {
						appearance: 'error',
						autoDismiss: true,
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }}>
			<Header url={url} />
			<div className="p-16">
				<h1 className="text-center text-18 font-semibold mb-15">
					Send Payment Link to your customer
				</h1>
				<h6 className="text-center text-16 mb-15">
					To Pay with Credit Card/Debit Card/Netbanking/UPI
				</h6>
				<form onSubmit={handleSubmit(onSubmit)} className="arzooo-row">
					<Input
						labelKey="Mobile Number"
						inputMode="numeric"
						placeholderKey="0000000000"
						className="mb-15"
						{...register('customerMobile', {
							required: `${'Mobile Number is required'}`,
							pattern: {
								value: /^[6-9]\d{9}$/,
								message: 'need correct format',
							},
							minLength: {
								value: 10,
								message: `Mobile number can't be greater than 10 digits`,
							},
							maxLength: {
								value: 10,
								message: `Mobile number can't be less than 10 digits`,
							},
						})}
						errorKey={errors.customerMobile?.message}
					/>
					<Input
						labelKey="Amount"
						inputMode="numeric"
						placeholderKey="Rs.300"
						{...register('amount', {
							required: `${'this field is required'}`,
							pattern: {
								value: /^[0-9]*$/,
								message: 'Please enter a valid amount',
							},
						})}
						errorKey={errors.amount?.message}
					/>
					<Button className="text-white text-18 font-semibold fixed-btn-bottom">
						SUBMIT
					</Button>
				</form>
				{show ? (
					<div className="font-semibold text-center mt-30 text-15">
						You can also copy and Share the below link
					</div>
				) : null}
				<Clipboard show={show} msg={msg} />
			</div>
		</div>
	);
};

Id.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Id;
