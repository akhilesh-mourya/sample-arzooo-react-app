/**
 * All the headers that open dropdown fileds are here
 * and getting things from context api and checking accordingly
 */

import React from 'react';
import cn from 'classnames';

import { useRegistration } from '@/context/ui.registration';
import ImageFile from '@/components/atoms/image.atom';

const SelectBusiness = () => {
	const { setBusinessInfo, businessInformation } = useRegistration();

	return (
		<>
			<div
				onClick={() =>
					setBusinessInfo(
						'type',
						'type',
						businessInformation?.businessType,
						businessInformation?.businessCategory,
						businessInformation?.businessSale,
					)
				}
				className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
			>
				<div
					className={cn(
						businessInformation?.businessType
							? 'absolute top-8 text-grey-text text-12 leading-16'
							: 'text-14 leading-21',
					)}
				>
					Business Type*
				</div>
				{businessInformation?.businessType ? (
					<div className="text-14 relative top-8">
						{businessInformation?.businessType}
					</div>
				) : (
					''
				)}
				<ImageFile src="Arrow-Down.svg" width={24} height={24} />
			</div>
			<div
				onClick={() =>
					setBusinessInfo(
						'type',
						'category',
						businessInformation?.businessType,
						businessInformation?.businessCategory,
						businessInformation?.businessSale,
					)
				}
				className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
			>
				<div
					className={cn(
						businessInformation?.businessCategory
							? 'absolute top-8 text-grey-text text-12 leading-16'
							: 'text-14 leading-21',
					)}
				>
					Category*
				</div>
				{businessInformation?.businessCategory ? (
					<div className="text-14 relative top-8">
						{businessInformation?.businessCategory}
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
						'sale',
						businessInformation?.businessType,
						businessInformation?.businessCategory,
						businessInformation?.businessSale,
					)
				}
				className="flex h-56 items-center justify-between border border-grey-border rounded-10 px-12 mt-12 relative"
			>
				<div
					className={cn(
						businessInformation?.businessSale
							? 'absolute top-8 text-grey-text text-12 leading-16'
							: 'text-14 leading-21',
					)}
				>
					Average Montly Sale*
				</div>
				{businessInformation?.businessSale ? (
					<div className="text-14 relative top-8">
						{businessInformation?.businessSale}
					</div>
				) : (
					''
				)}
				<ImageFile src="Arrow-Down.svg" width={24} height={24} />
			</div> */}
		</>
	);
};

export default SelectBusiness;
