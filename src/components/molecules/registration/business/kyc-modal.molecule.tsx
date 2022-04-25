import React from 'react';
import { useToasts } from 'react-toast-notifications';
import isEmpty from 'lodash.isempty';
import { useRouter } from 'next/router';

import Modal from '@/atoms/modal.atom';
import ImageFile from '@/atoms/image.atom';
import Pan from './kyc-details/pan.molecule';
import Gst from './kyc-details/gst.molecule';
import StoreImages from './kyc-details/store-images.molecule';
import Button from '@/atoms/button.atom';
import { useRegistration } from '@/context/ui.registration';
import { ROUTES } from '@/helpers/routes.helpers';

const KycModal = (props: {
	show: boolean;
	setModal: (show: boolean) => void;
}) => {
	const { addToast } = useToasts();
	const router = useRouter();
	const {
		kycInfo: { panNumber, panImage, gstNumber, gstImage },
		storeImages: { store1Image, store2Image, store3Image },
		businessInformation,
	} = useRegistration();

	function verifyDocs(e) {
		e.preventDefault();
		const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
		const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		if (isEmpty(businessInformation?.businessType)) {
			addToast('business type is required');
		} else if (isEmpty(businessInformation?.businessCategory)) {
			addToast('business category is required');
		}
		// else if (isEmpty(businessInformation?.businessSale)) {
		// 	addToast('business sale is required');
		// }
		// else if (isEmpty(kycInfo?.gstNumber)) {
		// 	addToast('gst number is required');
		// }
		else if (!isEmpty(gstNumber) && gstRegex.test(gstNumber) === false) {
			addToast('invalid gst number');
		}
		// else if (isEmpty(kycInfo?.gstImage)) {
		// 	addToast('upload gst images');
		// }
		else if (isEmpty(panNumber)) {
			addToast('pan number is required');
		} else if (panRegex.test(panNumber) === false) {
			addToast('invalid pan number');
		} else if (panImage === null) {
			addToast('upload pan image');
		} else if (store1Image === null) {
			addToast(
				'Selfie of the Proprietor / Managing partner is mandatory',
			);
		} else if (store2Image === null) {
			addToast('Shop entrance with Name board is mandatory');
		} else if (store3Image === null) {
			addToast('Shop setup with stock is mandatory');
		} else {
			// after submitting redirect to business page
			router.push(ROUTES.REGISTRATION_TERMS);
		}
	}

	return (
		<Modal
			open={props.show}
			containerClassName="bg-white"
			rootClassName="p-0"
			variant="full"
		>
			<div>
				<div className="px-10 py-15 flex items-center border-b border-grey-stroke">
					<div onClick={() => props.setModal(false)} className="flex">
						<ImageFile src="back.svg" width={24} height={24} />
					</div>
					<span className="text-20 leading-21 font-brandon font-bold px-16 tracking-0.29">
						Business KYC
					</span>
				</div>
				<StoreImages />
				<Pan />
				<Gst />
			</div>
			<div className="fixed bottom-0 h-68 w-full flex justify-center items-center shadow-2 p-8">
				<Button
					onClick={verifyDocs}
					className="bg-blue-primary text-16 font-semibold tracking-0.19 text-center w-full h-full rounded-6 text-white"
				>
					PROCEED
				</Button>
			</div>
		</Modal>
	);
};

export default KycModal;
