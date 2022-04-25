import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { arzooopay } from '@/api/api.api';
import {
	formatPrice,
	expiryMonths,
	expiryYears,
} from '@/helpers/utils.helpers';
import redirect from '@/services/redirect';
import Header from '../../../arzooopay/header';
import Button from '@/atoms/button.atom';
import Loader from '@/atoms/spinner.atom';
import Input from '@/atoms/input.atom';

interface IFormInputs {
	cardHolder: string;
	cardNumber: string;
	month: string;
	year: string;
	cvv: string;
}

const Debit = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { addToast } = useToasts();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		mode: 'onSubmit',
	});

	const onSubmit = (data) => {
		let paymentData = { paymentId: router.query.id };
		arzooopay(paymentData, (err, success) => {
			if (err) {
				addToast('Bad internet connection', {
					appearance: 'error',
					autoDismiss: true,
				});
			} else {
				if (success.status === 'success') {
					setLoading(true);
					let cardData = {
						number: data.cardNumber,
						holder: data.cardHolder,
						expiryMonth: data.month,
						expiryYear: '20' + data.year,
						cvv: data.cvv,
					};
					redirect(success.data.paymentObj, cardData, 'card');
				} else {
					addToast('Something went wrong in server', {
						appearance: 'info',
						autoDismiss: true,
					});
				}
			}
		});
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="px-10">
			<div className="max-w-568">
				<Header url="" />
			</div>
			<div className="font-semibold text-18 my-12">
				Enter Card Details
			</div>
			<form className="mb-90" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div>
						<Input
							labelKey="Name on the Card"
							placeholderKey="John Doe"
							className="mb-15"
							{...register('cardHolder', {
								required: `${'field is required'}`,
							})}
							errorKey={errors.cardHolder?.message}
						/>
					</div>
					<div className="mt-20">
						<Input
							labelKey="Card Number"
							inputMode="numeric"
							placeholderKey="0000000000"
							className="mb-15"
							{...register('cardNumber', {
								required: `${'field is required'}`,
								minLength: {
									value: 14,
									message: `Card number can't be greater than 14 digits`,
								},
								maxLength: {
									value: 18,
									message: `Card number can't be less than 18 digits`,
								},
							})}
							errorKey={errors.cardNumber?.message}
						/>
					</div>
					<div className="grid grid-cols-2 gap-10">
						<div className="flex items-center">
							<div className="w-full">
								<span className="block mb-8">Valid thru</span>
								<select
									className="bg-grey-stroke p-10 rounded-6"
									{...register('month')}
								>
									<option value="">MM</option>
									{expiryMonths().map((month) => (
										<option value={month} key={month}>
											{month}
										</option>
									))}
								</select>
								<select
									className="bg-grey-stroke p-10 rounded-6 ml-6"
									{...register('year')}
								>
									<option value="">YY</option>
									{expiryYears().map((year) => (
										<option value={year} key={year}>
											{year}
										</option>
									))}
								</select>
								{errors['year'] && (
									<p className="error-msg">
										{errors['year'].message}
									</p>
								)}
							</div>
						</div>
						<div className="arzooo-col-6 mt-20">
							<Input
								labelKey="CVV"
								inputMode="numeric"
								placeholderKey="123"
								className="mb-15"
								{...register('cvv', {
									required: `${'field is required'}`,
									minLength: {
										value: 3,
										message: `CVV can't be greater than 3 digits`,
									},
									maxLength: {
										value: 4,
										message: `CVV number can't be less than 4 digits`,
									},
								})}
								errorKey={errors.cvv?.message}
							/>
						</div>
					</div>
				</div>
				<div className="fixed-bottom-btn">
					<div className="side-by-side">
						<div className="font-semibold text-18 w-full">
							{formatPrice(router.query.amount)}
						</div>
						<Button className="w-full h-47 rounded-6 text-16 bg-blue-primary text-white">
							PAY NOW
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

Debit.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Debit;
