import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import isEmpty from 'lodash.isempty';

import CardRight from '@/atoms/card-right.atom';
import SheetAtom from '@/atoms/sheet.atom';
import Header from './header.molecule';
import { useRegistration } from '@/context/ui.registration';
import Input from '@/atoms/input.atom';
import ImageFile from '@/atoms/image.atom';
import Button from '@/components/atoms/button.atom';

const Pan = () => {
	const [show, setShow] = useState<boolean>(false);
	const [preview, setPreview] = useState();
	const [panVerify, setPanVerify] = useState<boolean>(false);
	const { addToast } = useToasts();
	const {
		kycInfo: { panNumber, panImage, gstNumber, gstImage },
		setKycInformation,
	} = useRegistration();

	useEffect(() => {
		if (!panImage) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(panImage) as any;
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [panImage]);

	function verifyPan() {
		const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		if (isEmpty(panNumber)) {
			addToast('pan number is required', { id: 'pan-number' });
		} else if (panRegex.test(panNumber) === false) {
			addToast('invalid pan number', { id: 'invalid-pan' });
		} else if (panImage === null) {
			addToast('upload pan image');
		} else {
			setPanVerify(true);
			setShow(false);
		}
	}

	return (
		<>
			<CardRight
				title="PAN*"
				img={panVerify ? 'Tick-Blue.svg' : 'Right.svg'}
				onClick={() => setShow(true)}
			/>
			<SheetAtom show={show} onClose={() => setShow(false)}>
				<div className="py-20">
					<Header
						title="PAN Details"
						onClick={() => setShow(false)}
					/>
					<div className="mt-20">
						<div className="flex h-56 items-center justify-between px-15 mt-6 relative">
							<Input
								name="pan"
								inputClassName="uppercase"
								root="w-full"
								placeholderKey="AVXXX2011Z"
								labelKey="Enter PAN Number*"
								value={panNumber}
								onChange={(e) =>
									setKycInformation(
										e?.target?.value,
										panImage,
										gstNumber,
										gstImage,
									)
								}
							/>
						</div>
						<div className="mt-10 mx-15 border-grey-stroke border rounded-6">
							{panImage ? (
								<div className="p-10">
									<div className="relative">
										<div className="mb-20 text-14 font-semibold text-blue-primary border-b inline-block border-blue-primary">
											Upload another
										</div>
										<input
											id="panFile"
											type="file"
											className="opacity-0 absolute w-full h-full left-0"
											accept=".jpeg"
											onChange={(e) =>
												setKycInformation(
													panNumber,
													e?.target?.files[0],
													gstNumber,
													gstImage,
												)
											}
										/>
									</div>
									<img
										src={preview}
										width={120}
										height={120}
									/>
								</div>
							) : (
								<div className="relative flex flex-col py-20 items-center justify-center">
									<input
										id="panFile"
										type="file"
										className="opacity-0 absolute w-full h-full"
										accept=".jpeg, .pdf"
										onChange={(e) =>
											setKycInformation(
												panNumber,
												e?.target?.files[0],
												gstNumber,
												gstImage,
											)
										}
									/>
									<div className="text-14 font-semibold">
										Add PAN
									</div>
									<ImageFile
										src="Camera.svg"
										width={24}
										height={24}
									/>
								</div>
							)}
						</div>
					</div>
					<div className="mx-15 mt-20">
						<Button
							onClick={verifyPan}
							className="bg-blue-primary w-full rounded-6 py-15 text-white font-semibold uppercase"
						>
							save
						</Button>
					</div>
				</div>
			</SheetAtom>
		</>
	);
};

export default Pan;
