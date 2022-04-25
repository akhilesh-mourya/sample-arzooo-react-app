import React, { useState } from 'react';

import ImageFile from '@/atoms/image.atom';
import { useRegistration } from '@/context/ui.registration';
import CardRight from '@/atoms/card-right.atom';
import SheetAtom from '@/atoms/sheet.atom';
import Header from './header.molecule';
import Button from '@/components/atoms/button.atom';

const StoreImages = () => {
	const [show, setShow] = useState<boolean>(false);
	const {
		storeImages: { store1Image, store2Image, store3Image },
		setStoreImages,
	} = useRegistration();

	return (
		<>
			<CardRight
				title="Store Images*"
				img={
					store1Image && store2Image && store3Image
						? 'Tick-Blue.svg'
						: 'Right.svg'
				}
				onClick={() => setShow(true)}
			/>
			<SheetAtom show={show} onClose={() => setShow(false)}>
				<div className="my-20">
					<Header
						title="Upload Store Images"
						onClick={() => setShow(false)}
					/>
					<div className="px-15">
						<div className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-6 relative">
							<div className="w-full h-full">
								<input
									id="gst"
									type="file"
									className="opacity-0 absolute"
									accept=".jpeg, .pdf"
									onChange={(e) =>
										setStoreImages(
											e?.target?.files,
											store2Image,
											store3Image,
										)
									}
								/>
								<div className="flex items-center justify-between h-full">
									<div className="text-12">
										1. Selfie of the Proprietor / Managing
										partner *
									</div>
									<ImageFile
										src="Camera.svg"
										width={24}
										height={24}
									/>
								</div>
							</div>
						</div>
						{store1Image && (
							<span className="text-10 leading-16 text-blue-primary">
								{store1Image?.[0]?.name}
							</span>
						)}
					</div>
					<div className="px-15">
						<div className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-6 relative">
							<div className="w-full h-full">
								<input
									id="gst"
									type="file"
									className="opacity-0 absolute"
									accept=".jpeg, .pdf"
									onChange={(e) =>
										setStoreImages(
											store1Image,
											e?.target?.files,
											store3Image,
										)
									}
								/>
								<div className="flex items-center justify-between h-full">
									<div className="text-12">
										2. Shop entrance with Name board *
									</div>
									<ImageFile
										src="Camera.svg"
										width={24}
										height={24}
									/>
								</div>
							</div>
						</div>
						{store2Image && (
							<span className="text-10 leading-16 text-blue-primary">
								{store2Image?.[0]?.name}
							</span>
						)}
					</div>
					<div className="px-15">
						<div className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-6 relative">
							<div className="w-full h-full">
								<input
									id="gst"
									type="file"
									className="opacity-0 absolute"
									accept=".jpeg, .pdf"
									onChange={(e) =>
										setStoreImages(
											store1Image,
											store2Image,
											e?.target?.files,
										)
									}
								/>
								<div className="flex items-center justify-between h-full">
									<div className="text-12">
										3. Shop setup with stock *
									</div>
									<ImageFile
										src="Camera.svg"
										width={24}
										height={24}
									/>
								</div>
							</div>
						</div>
						{store3Image && (
							<span className="text-10 leading-16 text-blue-primary">
								{store3Image?.[0]?.name}
							</span>
						)}
					</div>
					<div className="mx-15 mt-20">
						<Button
							disabled={
								!(store1Image && store2Image && store3Image)
							}
							onClick={() => setShow(false)}
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

export default StoreImages;
