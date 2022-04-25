import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import isEmpty from 'lodash.isempty';
import { useToasts } from 'react-toast-notifications';

import ImageFile from '@/components/atoms/image.atom';
import { sellOnArzooInfo } from '@/constants/common.constants';
import Input from '@/components/atoms/input.atom';
import Button from '@/components/atoms/button.atom';
import { useSellOnArzoooMutation } from '@/api/sell-on-arzooo/use-sell-on-arzooo.api';
import parseJwtToken from '@/helpers/getTokenData.helpers';

const Sheet = dynamic(import('@/components/atoms/sheet.atom'), {
	ssr: false,
});

export const dealCategory = [
	'Television',
	'Washing Machine',
	'Refrigerator',
	'Audio',
	'Laptop',
	'Mobiles',
	'AC',
	'SHA',
	'KA',
	'Others',
];

const SellOnArzooo = () => {
	const { addToast } = useToasts();
	const [category, setCategory] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const { mutate: sellOnArzooo, isLoading } = useSellOnArzoooMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
	});

	function chooseCategory(cat) {
		setCategory(cat);
		return setShow(false);
	}

	function submit(values: any) {
		let token = parseJwtToken() as any;
		if (isEmpty(category)) {
			return addToast('category is required');
		} else if (parseInt(values.quantity) < 10) {
			return addToast('minimum 10 unit required');
		} else {
			let data = {
				category,
				brand: values.brand,
				model: values.model,
				store_name: token?.username,
				seller_name: token?.username,
				deal_price: values.price,
				quantity: values.quantity,
			};
			sellOnArzooo(data as any);
		}
	}

	return (
		<div>
			<Sheet show={show} onClose={() => setShow(false)}>
				<div className="px-20 py-20">
					<div className="border-b border-dashed pb-12">
						<div className="text-16 leading-24">Category*</div>
						<div className="text-12 leading-16 mt-2">
							Select from below
						</div>
					</div>
					{dealCategory?.map((cat) => {
						return (
							<div
								key={cat}
								onClick={() => chooseCategory(cat)}
								className={cn(
									'py-16 border-b border-grey-border text-12 leading-18',
									cat === category ? 'text-blue-primary' : '',
								)}
							>
								{cat}
							</div>
						);
					})}
				</div>
			</Sheet>
			<div className="text-center mt-20">
				<div className="text-20 leading-28 font-semibold">
					Got a product at great price?
				</div>
				<div className="text-18 leading-28 pt-6">Sell here</div>
			</div>
			<form onSubmit={handleSubmit(submit)} className="px-20 mt-20">
				<div
					onClick={() => setShow(true)}
					className="flex h-56 items-center justify-between border border-grey-stroke rounded-10 px-12 mt-12 mb-20 relative"
				>
					<div
						className={cn(
							category !== ''
								? 'absolute top-8 text-grey-text text-12 leading-16'
								: 'text-14 leading-21',
						)}
					>
						Category*
					</div>
					{category !== '' ? (
						<div className="text-14 relative top-8">{category}</div>
					) : (
						''
					)}
					<ImageFile src="Arrow-Down.svg" width={24} height={24} />
				</div>
				{sellOnArzooInfo?.map((input) => {
					return (
						<Input
							key={input?.name}
							name={input?.name}
							labelKey={input?.label}
							placeholderKey={input?.placeholder}
							className={input?.className}
							errorKey={errors[input?.name]?.message}
							inputMode={input?.inputMode as any}
							{...register(input?.name, input?.validations)}
						/>
					);
				})}
				<Button
					loading={isLoading}
					disabled={isLoading}
					className="bg-blue-primary w-full h-47 rounded-6 text-white text-16 font-semibold mb-20"
				>
					SUBMIT
				</Button>
			</form>
		</div>
	);
};

export default SellOnArzooo;
