import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import dynamic from 'next/dynamic';

import Spinner from '@/atoms/spinner.atom';
import { useGetUserDetails } from '@/api/my-account/use-get-user-details';
import UpdateStatus from '@/atoms/status.atom';
import Input from '@/atoms/input.atom';
import Button from '@/components/atoms/button.atom';
import ImageFile from '@/components/atoms/image.atom';
import { useAuth } from '@/context/auth.context';
import { useUI } from '@/context/ui.context';
import { useRegistration } from '@/context/ui.registration';
import { useUpdateUserProfileMutation } from '@/api/my-account/update-user-details';
import { fetchPincodeDetails } from '@/api/api.api';
import { useUpdateAddressMutation } from '@/api/my-account/update-address';

const Dropdown = dynamic(
	() =>
		import(
			'@/components/molecules/registration/business/dropdown.molecule'
		),
);

const Business = () => {
	const { data, isLoading, error } = useGetUserDetails(); //get the details intially
	const [loading, setLoading] = useState(false); //pincode loader
	const [districtId, setDistrictId] = useState(null); // set the district id
	const [city, setCity] = useState(null); //set city
	const [state, setState] = useState(null); //set state
	const { session } = useAuth(); // user details
	const { setBusinessInfo, businessInformation } = useRegistration(); //for bottom sheets in registration page
	const {
		mutate: updateUserProfile,
		isLoading: loader,
		error: isError,
	} = useUpdateUserProfileMutation(); //update user
	const {
		mutate: updateAddress,
		isLoading: load,
	} = useUpdateAddressMutation(); // update address
	const { profileData } = useUI(); //gettting profile data which was saved in profile tab

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		mode: 'onSubmit',
	});
	const watchPincode = watch('pincode'); //watching pincode for changes

	useEffect(() => {
		//setting up the intial data
		setValue('firm_name', data?.data?.firm_name);
		setValue('gstin', data?.data?.gstin);
		setValue('pan', data?.data?.pan);
		setValue('address', data?.data?.address);
		setValue(
			'pincode',
			data?.data?.pincode ? data?.data?.pincode.toString() : '',
		);
		setValue('city', data?.data?.city);
		setValue('state', data?.data?.state);
		setBusinessInfo(
			null,
			null,
			data?.data?.type,
			data?.data?.category,
			data?.data?.store_potential,
		);
	}, [data]);

	useEffect(() => {
		//setting up the pincode as soon as it touches 6 and then setting up districtId, city and state
		//and also showing loader
		if (watchPincode?.length === 6) {
			setLoading(true);
			fetchPincodeDetails(watchPincode, (err, data) => {
				if (err) {
					console.log(err);
					setLoading(false);
				} else {
					setDistrictId(data?.districtId);
					setCity(data?.city);
					setState(data?.state);
					setValue('city', data?.city);
					setValue('state', data?.state);
					setLoading(false);
				}
			});
		}
	}, [watchPincode]);

	const eventHandlers = {
		//profile submit data
		onSubmit: (values) => {
			const updateProfileData = {
				category: businessInformation.businessCategory,
				dob: profileData?.dob
					? profileData?.dob
					: data?.data?.date_of_birth,
				email: profileData?.email
					? profileData?.email
					: data?.data?.email,
				firm_name: values.firm_name,
				gender: profileData?.gender
					? profileData?.gender
					: data?.data?.gender,
				gstin: values.gstin,
				mobile_number: profileData?.mobile_number
					? profileData?.mobile_number
					: data?.data?.mobile_number,
				owner_name: profileData?.owner_name,
				profile_photo: profileData?.profile_photo
					? profileData?.profile_photo
					: data?.data?.profile_photo,
				store_potential: businessInformation.businessSale,
				type: businessInformation.businessType,
				pan: values.pan,
			};
			//address submit data
			const addressData = {
				userId: session.user_id,
				admin_update: 1,
				line_1: values.address,
				address: null,
				pincode: values.pincode,
				state,
				name: session.name,
				districtId: districtId,
				addressId: data?.data?.addressId,
				city,
			};
			updateAddress(addressData); //update address
			updateUserProfile(updateProfileData as any); //update profile
		},
	};

	const renderers = {
		renderPrefix: () => {
			return (
				<div className="absolute right-0 bottom-2">
					<ImageFile src="Verify.svg" width={24} height={24} />
				</div>
			);
		},
	};

	if (isLoading || loader || loading || load) {
		return <Spinner />;
	}

	if (error || isError) {
		return (
			<UpdateStatus
				text="Error Occurred!"
				className="my-20 text-center text-14 leading-21 text-red"
			/>
		);
	}

	return (
		<div className="px-16 mt-15 mb-80">
			{/* bottom sheet */}
			<Dropdown />
			<form
				onSubmit={handleSubmit(eventHandlers.onSubmit)}
				className="relative"
			>
				<Input
					readOnly={data?.data?.firm_name ? true : false}
					name="firm_name"
					labelKey="Store Name*"
					placeholderKey="Sai Electronics"
					className="mb-20 relative"
					errorKey={errors.firm_name?.message}
					inputMode="text"
					{...register('firm_name', {
						required: 'store name is required',
					})}
					prefix={
						data?.data?.firm_name ? renderers.renderPrefix() : null
					}
				/>
				<Input
					readOnly={data?.data?.gstin ? true : false}
					name="gstin"
					className="mb-20 relative"
					inputClassName="uppercase"
					placeholderKey="18AABCU9603R1ZM"
					labelKey="Enter GST Number*"
					errorKey={errors.gstin?.message}
					{...register('gstin', {
						required: 'gstin is required',
					})}
					prefix={data?.data?.gstin ? renderers.renderPrefix() : null}
				/>
				<Input
					readOnly={data?.data?.pan ? true : false}
					name="pan"
					inputClassName="uppercase"
					className="mb-20 relative"
					placeholderKey="AVXXX2011Z"
					labelKey="Enter PAN Number*"
					errorKey={errors.pan?.message}
					{...register('pan', {
						required: 'pan is required',
					})}
					prefix={data?.data?.pan ? renderers.renderPrefix() : null}
				/>
				<Input
					name="address"
					labelKey="Store Address*"
					placeholderKey="#8, 8th cross, Magadi Road , Bengaluru"
					className="mb-20 relative"
					errorKey={errors.address?.message}
					inputMode="text"
					{...register('address', {
						required: 'address is required',
					})}
				/>
				<Input
					name="pincode"
					labelKey="Pin Code*"
					placeholderKey="560023"
					className="mb-20 relative"
					errorKey={errors.pincode?.message}
					inputMode="numeric"
					{...register('pincode', {
						required: 'pincode is required',
						pattern: {
							value: /^^[1-9][0-9]{5}$/i,
							message: 'invalid pincode',
						},
					})}
				/>
				<Input
					readOnly
					name="city"
					labelKey="City*"
					placeholderKey="Bengaluru"
					className="mb-20 relative"
					errorKey={errors.city?.message}
					{...register('city', {
						required: 'city is required',
					})}
				/>
				<Input
					readOnly
					name="state"
					labelKey="State*"
					placeholderKey="Karnataka"
					className="mb-20 relative"
					errorKey={errors.state?.message}
					{...register('state', {
						required: 'state is required',
					})}
				/>
				<div
					onClick={() =>
						setBusinessInfo(
							'type',
							'type',
							businessInformation.businessType,
							businessInformation.businessCategory,
							businessInformation.businessSale,
						)
					}
					className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
				>
					<div
						className={cn(
							businessInformation.businessType
								? 'absolute top-8 text-grey-text text-12 leading-16'
								: 'text-14 leading-21',
						)}
					>
						Business Type
					</div>
					{businessInformation.businessType ? (
						<div className="text-14 relative top-8">
							{businessInformation.businessType}
						</div>
					) : (
						''
					)}
					<ImageFile src="Arrow-Down.svg" width={24} height={24} />
				</div>
				{/* <div
					onClick={() =>
						setBusinessInfo(
							'type',
							'category',
							businessInformation.businessType,
							businessInformation.businessCategory,
							businessInformation.businessSale,
						)
					}
					className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
				>
					<div
						className={cn(
							businessInformation.businessCategory
								? 'absolute top-8 text-grey-text text-12 leading-16'
								: 'text-14 leading-21',
						)}
					>
						Category
					</div>
					{businessInformation.businessCategory ? (
						<div className="text-14 relative top-8">
							{businessInformation.businessCategory}
						</div>
					) : (
						''
					)}
					<ImageFile src="Arrow-Down.svg" width={24} height={24} />
				</div> */}
				<div
					onClick={() =>
						setBusinessInfo(
							'type',
							'sale',
							businessInformation.businessType,
							businessInformation.businessCategory,
							businessInformation.businessSale,
						)
					}
					className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
				>
					<div
						className={cn(
							businessInformation.businessSale
								? 'absolute top-8 text-grey-text text-12 leading-16'
								: 'text-14 leading-21',
						)}
					>
						Average Montly Sale
					</div>
					{businessInformation.businessSale ? (
						<div className="text-14 relative top-8">
							{businessInformation.businessSale}
						</div>
					) : (
						''
					)}
					<ImageFile src="Arrow-Down.svg" width={24} height={24} />
				</div>
				<div className="fixed w-full left-0 px-16 py-16 bg-white bottom-0">
					<Button
						type="submit"
						className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12"
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Business;
