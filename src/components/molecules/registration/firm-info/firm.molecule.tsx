import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useRegistration } from '@/context/ui.registration';
import { fetchPincodeDetails } from '@/api/api.api';
import Spinner from '@/atoms/spinner.atom';
import { ROUTES } from '@/helpers/routes.helpers';
import Input from '@/atoms/input.atom';
import Button from '@/components/atoms/button.atom';

export const registrationFirmInfo = [
	{
		name: 'owner_name',
		label: 'Owner Name*',
		placeholder: 'Vinod Kumar',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'owner name is required',
			pattern: {
				value: /^[a-zA-Z ]*$/,
				message: 'invalid owner name',
			},
		},
	},
	{
		name: 'firm_name',
		label: 'Store Name*',
		placeholder: 'Sai Electronics',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'store name is required',
		},
	},
	{
		name: 'email',
		label: 'E-mail Address*',
		placeholder: 'saielectronics@gmail.com',
		className: 'mb-20',
		inputMode: 'email',
		validations: {
			required: 'email is required',
			pattern: {
				value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
				message: 'invalid email',
			},
		},
	},
	{
		name: 'mobile_number',
		label: 'Mobile Number*',
		placeholder: '0000000000',
		className: 'mb-20',
		inputMode: 'numeric',
		validations: {
			required: 'mobile number is required',
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
		},
	},
	{
		name: 'address',
		label: 'Store Address*',
		placeholder: '#8, 8th cross, Magadi Road , Bengaluru',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'address is required',
		},
	},
	{
		name: 'pincode',
		label: 'Pin Code*',
		placeholder: '560023',
		className: 'mb-20',
		inputMode: 'numeric',
		validations: {
			required: 'pincode is required',
			pattern: {
				value: /^[1-9][0-9]{5}$/i,
				message: 'invalid pincode',
			},
		},
	},
	{
		name: 'state',
		label: 'State',
		placeholder: 'Karnataka',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'state is required',
		},
	},
	{
		name: 'city',
		label: 'City',
		placeholder: 'Bengaluru',
		className: 'mb-20',
		inputMode: 'text',
		validations: {
			required: 'city is required',
		},
	},
	{
		name: 'referalcode',
		label: 'Referal Code(If any)',
		placeholder: '0000',
		className: 'mb-20',
		inputMode: 'numeric',
	},
];

const FirmInfo = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({
		mode: 'onSubmit',
	});
	const {
		setFirmInformation,
		firmInformation: {
			firm_name,
			mobile_number,
			owner_name,
			email,
			pincode,
			city,
			state,
			address,
			referalcode,
		},
	} = useRegistration();
	const watchPincode = watch('pincode');

	useEffect(() => {
		setValue('owner_name', owner_name);
		setValue('firm_name', firm_name);
		setValue('email', email);
		setValue('mobile_number', mobile_number);
		setValue('address', address);
		setValue('pincode', pincode);
		setValue('state', state);
		setValue('city', city);
		setValue('referalcode', referalcode);
	}, []);

	useEffect(() => {
		if (watchPincode?.length === 6) {
			setLoading(true);
			fetchPincodeDetails(watchPincode, (err, data) => {
				if (err) {
					console.log(err);
					setLoading(false);
				} else {
					setValue('city', data.city);
					setValue('state', data.state);
					setLoading(false);
				}
			});
		}
	}, [watchPincode]);

	const onSubmit = (values: CommonTypes.FirmInformationType) => {
		setFirmInformation(values);
		router.push(ROUTES.REGISTRATION_BUSINESS);
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-15 mb-80">
				{registrationFirmInfo?.map((input) => {
					return (
						<Input
							key={input?.name}
							labelKey={input?.label}
							placeholderKey={input?.placeholder}
							className={input?.className}
							errorKey={errors[input?.name]?.message}
							inputMode={input?.inputMode as any}
							{...register(input?.name, input?.validations)}
						/>
					);
				})}
				<div className="fixed bottom-0 left-0 h-68 bg-white w-full flex justify-center items-center shadow-2 p-8 z-1">
					<Button className="bg-blue-primary text-16 font-semibold tracking-0.19 text-center w-full h-full rounded-6 text-white uppercase">
						next
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FirmInfo;
