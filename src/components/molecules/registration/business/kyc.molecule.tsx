import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import isEmpty from 'lodash.isempty';

import ImageFile from '@/atoms/image.atom';
import { useRegistration } from '@/context/ui.registration';
import KycModal from './kyc-modal.molecule';

const Kyc = () => {
	const [showModal, setModal] = useState<boolean>(false);
	const { businessInformation, setBusinessInfo } = useRegistration();
	const { addToast } = useToasts();

	const handleKyc = () => {
		// setModal(true);
		if (isEmpty(businessInformation?.businessType)) {
			addToast('business type is required', { id: 'business type' });
			const timeout = setTimeout(() => {
				setBusinessInfo(
					'type',
					'type',
					businessInformation?.businessType,
					businessInformation?.businessCategory,
					businessInformation?.businessSale,
				);
			}, 2000);
			return () => clearTimeout(timeout);
		} else if (isEmpty(businessInformation?.businessCategory)) {
			addToast('business category is required', { id: 'category type' });
			const timeout = setTimeout(() => {
				setBusinessInfo(
					'type',
					'category',
					businessInformation?.businessType,
					businessInformation?.businessCategory,
					businessInformation?.businessSale,
				);
			}, 2000);
			return () => clearTimeout(timeout);
		}
		// else if (isEmpty(businessInformation?.businessSale)) {
		// 	addToast('business sale is required', { id: 'sale type' });
		// 	const timeout = setTimeout(() => {
		// 		setBusinessInfo(
		// 			'type',
		// 			'sale',
		// 			businessInformation?.businessType,
		// 			businessInformation?.businessCategory,
		// 			businessInformation?.businessSale,
		// 		);
		// 	}, 2000);
		// 	return () => clearTimeout(timeout);
		// }
		else {
			setModal(true);
		}
	};

	return (
		<>
			<KycModal show={showModal} setModal={setModal} />
			<div
				onClick={handleKyc}
				className="border border-grey-border h-56 mt-12 rounded-10 flex justify-between items-center px-12"
			>
				<div className="text-14 leading-21">Business KYC *</div>
				<ImageFile src="Right.svg" width={24} height={24} />
			</div>
		</>
	);
};

export default Kyc;
