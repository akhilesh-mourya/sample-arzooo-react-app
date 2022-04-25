import React from 'react';
import cn from 'classnames';
import NumberFormat from 'react-number-format';
import { useForm, Controller } from 'react-hook-form';

import Button from '@/atoms/button.atom';
import Input from '@/atoms/input.atom';
import { cardExpiry } from '@/helpers/utils.helpers';
import Rupee from '@/components/atoms/rupee.atom';

const Card = (props: { onSubmit: any; amount: number; isLoading: boolean }) => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
	});

	return (
		<form onSubmit={handleSubmit(props.onSubmit)} className="relative">
			<Controller
				control={control}
				name="card_number"
				rules={{ required: 'card number is required' }}
				render={({ field: { onChange, ref, name, value } }) => (
					<>
						<div
							className={cn(
								errors.card_number?.message ? 'text-red' : '',
								'text-10 mb-2 font-semibold',
							)}
						>
							Card Number*
						</div>
						<NumberFormat
							format="#### #### #### ####"
							placeholder="1234123412341234"
							name={name}
							value={value}
							onChange={onChange}
							className={cn(
								errors.card_number?.message
									? 'border-red'
									: 'border-grey-stroke',
								'w-full text-16 text-grey-primary leading-21 border-b-1.5',
							)}
						/>
						{errors.card_number?.message ? (
							<p className="my-2 text-12 text-red">
								{errors.card_number?.message}
							</p>
						) : null}
					</>
				)}
			/>
			<Input
				name="card_holder"
				labelKey="Card Holder Name*"
				placeholderKey="Vinod Kumar"
				className="my-20"
				errorKey={errors.card_holder?.message}
				inputMode="text"
				{...register('card_holder', {
					required: 'card holder name is required',
				})}
			/>
			<div className="grid grid-cols-2 gap-10 mb-20">
				<div>
					<Controller
						control={control}
						name="card_exipry"
						rules={{ required: 'expiry date is required' }}
						render={({ field: { onChange, ref, name, value } }) => (
							<>
								<div
									className={cn(
										errors.card_exipry?.message
											? 'text-red'
											: '',
										'text-10 mb-2 font-semibold',
									)}
								>
									Card Expiry*
								</div>
								<NumberFormat
									name={name}
									value={value}
									onChange={onChange}
									placeholder="MM/YY"
									format={cardExpiry}
									className={cn(
										errors.card_exipry?.message
											? 'border-red'
											: 'border-grey-stroke',
										'w-full text-16 text-grey-primary leading-21 border-b-1.5',
									)}
								/>
								{errors.card_exipry?.message ? (
									<p className="my-2 text-12 text-red">
										{errors.card_exipry?.message}
									</p>
								) : null}
							</>
						)}
					/>
				</div>
				<Input
					name="card_cvv"
					labelKey="CVV*"
					placeholderKey="123"
					className="mt-6"
					errorKey={errors.card_cvv?.message}
					inputMode="numeric"
					{...register('card_cvv', {
						required: 'cvv is required',
					})}
				/>
			</div>
			<div className="fixed z-3 w-full left-0 px-16 py-16 bg-white bottom-0">
				<Button
					disabled={props.isLoading}
					loading={props.isLoading}
					type="submit"
					className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12 uppercase"
				>
					pay <Rupee money={props.amount} />
				</Button>
			</div>
		</form>
	);
};

export default Card;
