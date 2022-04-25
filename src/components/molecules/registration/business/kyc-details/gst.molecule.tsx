import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import isEmpty from 'lodash.isempty';

import Radio from '@/atoms/radio.atom';
import { useRegistration } from '@/context/ui.registration';
import SheetAtom from '@/atoms/sheet.atom';
import Header from './header.molecule';
import Button from '@/components/atoms/button.atom';
import Input from '@/components/atoms/input.atom';
import ImageFile from '@/components/atoms/image.atom';

const radioData = [
	{ id: 0, title: 'Yes', desc: 'No, I am Exempted' },
	{ id: 1, title: 'No', desc: 'Yes, I have GSTIN' },
];

const Gst = () => {
	const [show, setShow] = useState<boolean>(false);
	const [preview, setPreview] = useState();
	const [gstVerify, setGstVerify] = useState<boolean>(false);
	const { addToast } = useToasts();
	const {
		kycInfo: { panNumber, panImage, gstNumber, gstImage },
		setKycInformation,
		firmInformation: { owner_name },
		radioSelected,
		setRadioSelected,
		setGstDeclaration,
	} = useRegistration();

	function onChange(val) {
		setRadioSelected(val);
		setShow(true);
	}

	function verifyGst() {
		const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
		if (isEmpty(gstNumber)) {
			addToast('gst number is required', { id: 'gst-number' });
		} else if (gstRegex.test(gstNumber) === false) {
			addToast('invalid gst number', { id: 'invalid-gst' });
		} else if (gstImage === null) {
			addToast('upload gst image');
		} else {
			setGstVerify(true);
			setShow(false);
		}
	}

	return (
		<>
			<div className="m-10 border border-grey-stroke rounded-6 p-15">
				<div>
					<div className="border-b pb-10 font-semibold justify-between flex items-center">
						<span>GST *</span>
						{/* <span className="text-12 pl-6 text-red">
							*(Mandatory)
						</span> */}
						{gstVerify && (
							<ImageFile
								src="Tick-Blue.svg"
								width={30}
								height={30}
							/>
						)}
					</div>
				</div>
				<div className="pt-10">
					<div className="pb-10 text-14 font-medium">
						Are you registered with GST?
					</div>
					<Radio
						data={radioData}
						selected={radioSelected}
						onChange={onChange}
						radioClass="py-10 border border-grey-stroke px-10 rounded-6 w-full justify-between"
					/>
				</div>
			</div>
			<SheetAtom show={show} onClose={() => setShow(false)}>
				<div className="py-20">
					<Header
						title={
							radioSelected === 'Yes'
								? 'GST Exempt'
								: 'GST Details'
						}
						onClick={() => setShow(false)}
					/>
					{radioSelected === 'No' ? (
						<div>
							<div className="mt-20">
								<div className="flex h-56 items-center justify-between px-15 mt-6 relative">
									<Input
										name="gstin"
										inputClassName="uppercase"
										root="w-full"
										placeholderKey="18AABCU9603R1ZM"
										labelKey="Enter GST Number*"
										value={gstNumber}
										onChange={(e) =>
											setKycInformation(
												panNumber,
												panImage,
												e?.target?.value,
												gstImage,
											)
										}
									/>
								</div>
								<div className="mt-10 mx-15 border-grey-stroke border rounded-6 pl-8">
									{gstImage ? (
										<span className="text-10 leading-16 text-blue-primary">
											{gstImage?.name}
										</span>
									) : (
										<div className="relative flex flex-col py-20 items-center justify-center">
											<input
												id="gstFile"
												type="file"
												className="opacity-0 absolute w-full h-full"
												accept=".jpeg, .pdf"
												onChange={(e) =>
													setKycInformation(
														panNumber,
														panImage,
														gstNumber,
														e?.target?.files,
													)
												}
											/>
											<div className="text-14 font-semibold">
												Add GST
											</div>
											<ImageFile
												src="Camera.svg"
												width={24}
												height={24}
											/>
											{gstImage ? (
												<span className="text-10 leading-16 text-blue-primary">
													{gstImage?.name}
												</span>
											) : null}
										</div>
									)}
								</div>
							</div>
							<div className="mx-15 mt-20">
								<Button
									onClick={verifyGst}
									className="bg-blue-primary w-full rounded-6 py-15 text-white font-semibold uppercase"
								>
									save
								</Button>
							</div>
						</div>
					) : (
						<div>
							<div className="px-15 py-20 text-14 justify-start">
								<div>
									I {owner_name} (Name of the service
									provider/business entity), do hereby declare
									that I am not registered under the Goods and
									Services Tax Act, 2017.{' '}
								</div>
								<div>
									I hereby also confirm that if anytime during
									any financial year I decide or require or
									become liable to register under the GST, I
									undertake to provide all the requisite
									documents and information.{' '}
								</div>
								<div>
									I request you to consider this communication
									as a declaration for not requiring to be
									registered under the Goods and Service Tax
									Act, 2017.
								</div>
								<div>
									{' '}
									I hereby also confirm that Arzooo shall not
									be liable for any loss accrued to me/us, due
									to any registration default with the GST.
								</div>
							</div>
							<div className="flex justify-end px-10 border-t border-grey-stroke pt-15">
								<Button
									onClick={() => {
										setGstDeclaration(true), setShow(false);
									}}
									className="bg-blue-primary text-14 font-semibold px-20 py-8 text-white rounded-8"
								>
									YES
								</Button>
								<Button
									className="px-20 py-8"
									onClick={() => {
										setShow(false),
											setGstDeclaration(false);
									}}
								>
									NO
								</Button>
							</div>
						</div>
					)}
				</div>
			</SheetAtom>
		</>
	);
};

export default Gst;
