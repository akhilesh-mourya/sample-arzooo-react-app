import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import Calendar from 'react-calendar';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

import Spinner from '@/atoms/spinner.atom';
import { useGetUserDetails } from '@/api/my-account/use-get-user-details';
import UpdateStatus from '@/atoms/status.atom';
import Input from '@/atoms/input.atom';
import Button from '@/components/atoms/button.atom';
import ImageFile from '@/components/atoms/image.atom';
import { useAuth } from '@/context/auth.context';
import { useUpdateProfilePicMutation } from '@/api/my-account/update-profile-pic';
import { useUI } from '@/context/ui.context';

const Modal = dynamic(() => import('@/atoms/modal.atom'));

const Profile = () => {
	const router = useRouter();
	const { pathname, query } = router;
	const [picture, setPicture] = useState(); //saving the local pic
	const [imgData, setImgData] = useState();
	const [show, setShow] = useState<boolean>(false); //for modal state
	const [dob, setDob] = useState<any>(); //for date in dob
	const [gender, setGender] = useState<string>(null); //for gender
	const { data, isLoading, error } = useGetUserDetails(); //get the details intially
	const {
		mutate: updateProfilePic,
		isLoading: loader,
	} = useUpdateProfilePicMutation(); //upload profile pic api
	const { session } = useAuth(); // getting user data
	const { setProfileData } = useUI(); // saving profile data and passing to business tab
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: 'onSubmit',
	});

	useEffect(() => {
		// setting up the intial state
		setValue('owner_name', data?.data?.owner_name);
		setValue('email', data?.data?.email);
		setValue('mobile_number', data?.data?.mobile_number);
		setGender(data?.data?.gender);
		setDob(data?.data?.date_of_birth);
	}, [data]);

	const eventHandlers = {
		// upload profile pic
		onChangePicture: (e) => {
			const reader = new FileReader() as any;
			const file = e.target.files[0];
			reader.onloadend = () => {
				setPicture(file);
				setImgData(reader?.result);
				let formData = new FormData();
				formData.append('file', file, file.name);
				formData.append('mobile_number', session?.username);
				updateProfilePic(formData);
			};
			reader.readAsDataURL(file);
		},
		//setting up the data in context and pushing it to business page
		onSubmit: (values) => {
			const { ...restQuery } = query;
			let data = {
				owner_name: values.owner_name,
				mobile_number: values.mobile_number,
				email: values.email,
				dob: dob ? dob : '',
				gender: gender,
				profile_photo: picture,
			};
			setProfileData(data);
			router.push({
				pathname,
				query: {
					...restQuery,
					path: 'business-information',
				},
			});
		},
	};

	const renderers = {
		renderCheckbox: () => {
			return (
				<div className="absolute -top-10 -right-10">
					<ImageFile src="Checkbox.svg" width={24} height={24} />
				</div>
			);
		},
	};

	if (isLoading || loader) {
		return <Spinner />;
	}

	if (error) {
		return (
			<UpdateStatus
				text="Error Occurred!"
				className="my-20 text-center text-14 leading-21 text-red"
			/>
		);
	}

	return (
		<>
			<Modal open={show}>
				<div className="bg-white text-center">
					<Calendar
						onChange={(value) =>
							setDob(format(value, 'MM/dd/yyyy'))
						}
						value={dob ? new Date(dob) : new Date()}
					/>
					<Button
						onClick={() => setShow(false)}
						className="bg-blue-primary text-white mb-20 px-16 py-8 rounded-6"
					>
						Apply
					</Button>
				</div>
			</Modal>
			<div className="px-16 mt-15 mb-80">
				<div className="text-center mb-16">
					<div className="w-104 h-104 rounded-full bg-grey-border my-0 mx-auto relative">
						<div className="w-92 h-92 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
							{data?.data?.profile_photo ? (
								<ImageFile
									local={false}
									src={`${process.env.NEXT_PUBLIC_PATH}/images/store-registeration-docs/${data?.data?.profile_photo}`}
									width={92}
									height={92}
								/>
							) : (
								<ImageFile
									src="User.svg"
									width={92}
									height={92}
								/>
							)}
						</div>
					</div>
					<div className="mt-10 bg-blue-secondary rounded-4 inline-block px-10 py-4 text-blue-primary text-11 leading-18 tracking-0.12 font-normal relative">
						<label
							htmlFor="profile-pic"
							className="custom-file-upload"
						>
							Change Picture
						</label>
						<input
							id="profile-pic"
							type="file"
							className="hidden"
							onChange={eventHandlers.onChangePicture}
						/>
					</div>
				</div>
				<form
					onSubmit={handleSubmit(eventHandlers.onSubmit)}
					className="relative"
				>
					<Input
						name="owner_name"
						labelKey="Owner Name*"
						placeholderKey="Vinod Kumar"
						className="mb-20"
						errorKey={errors.owner_name?.message}
						inputMode="text"
						{...register('owner_name', {
							required: 'owner name is required',
							pattern: {
								value: /^[a-zA-Z ]*$/,
								message: 'invalid owner name',
							},
						})}
					/>
					<div className="mb-20">
						<div className="text-16 leading-21 tracking-0.22 mb-18">
							Select Gender
						</div>
						<div className="flex">
							<div
								onClick={() => setGender('male')}
								className={cn(
									gender === 'male'
										? 'border-blue-primary bg-blue-secondary'
										: 'border-grey-stroke bg-white',
									'border rounded-6 w-68 h-68 mr-24 flex justify-center items-end relative',
								)}
							>
								<ImageFile
									src="male.svg"
									width={32}
									height={50}
								/>
								{gender === 'male' &&
									renderers.renderCheckbox()}
							</div>
							<div
								onClick={() => setGender('female')}
								className={cn(
									gender === 'female'
										? 'border-blue-primary bg-blue-secondary'
										: 'border-grey-stroke bg-white',
									'border rounded-6 w-68 h-68 mr-24 flex justify-center items-end relative',
								)}
							>
								<ImageFile
									src="female.svg"
									width={32}
									height={50}
								/>
								{gender === 'female' &&
									renderers.renderCheckbox()}
							</div>
							<div
								onClick={() => setGender('no-preference')}
								className={cn(
									gender === 'no-preference'
										? 'border-blue-primary bg-blue-secondary'
										: 'border-grey-stroke bg-white',
									'border rounded-6 w-68 h-68 mr-24 text-8 flex justify-center items-center text-center leading-12 relative',
								)}
							>
								Prefer not to mention
								{gender === 'no-preference' &&
									renderers.renderCheckbox()}
							</div>
						</div>
					</div>
					<div className="mb-20 relative">
						<label className="text-10 mb-2 font-semibold">
							Date of Birth
						</label>
						<div
							onClick={() => setShow(true)}
							className="flex justify-between items-center border-b pb-10 border-grey-stroke"
						>
							<div className="relative top-5 text-14 text-grey-primary leading-21">
								{dob ? dob : ''}
							</div>
							<ImageFile
								src="Calender.svg"
								width={24}
								height={24}
							/>
						</div>
					</div>
					<Input
						readOnly={data?.data?.mobile_number ? true : false}
						name="mobile_number"
						labelKey="Mobile Number"
						placeholderKey="0000000000"
						className="mb-20 relative"
						errorKey={errors.mobile_number?.message}
						inputMode="numeric"
						prefix={
							data?.data?.mobile_number ? (
								<div className="absolute right-0 bottom-2">
									<ImageFile
										src="Verify.svg"
										width={24}
										height={24}
									/>
								</div>
							) : null
						}
						{...register('mobile_number', {
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
						})}
					/>
					<Input
						name="email"
						labelKey="E-mail Address"
						placeholderKey="saielectronics@gmail.com"
						className="mb-20"
						errorKey={errors.email?.message}
						inputMode="text"
						{...register('email', {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email',
							},
						})}
					/>
					<div className="fixed w-full left-0 px-16 py-16 bg-white bottom-0">
						<Button
							type="submit"
							className="w-full bg-blue-primary h-56 rounded-8 text-white text-16 leading-12"
						>
							Continue
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Profile;
