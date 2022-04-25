/**
 * All the deropdown fileds go here
 */

import React from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';

import {
	registrationBusiness,
	registrationCategories,
	registrationSale,
} from '@/constants/common.constants';
import { useRegistration } from '@/context/ui.registration';

const Sheet = dynamic(import('@/components/atoms/sheet.atom'), {
	ssr: false,
});

const Dropdown = () => {
	const { setBusinessInfo, businessInformation } = useRegistration();

	/** header function */
	const renderHeader = (title, subtitle) => (
		<div className="border-b border-dashed pb-12">
			<div className="text-16 leading-24">{title}</div>
			<div className="text-12 leading-16 mt-2">{subtitle}</div>
		</div>
	);

	/** render info based on the business type */
	const renderDropdown = () => {
		if (businessInformation?.dropdownType === 'type') {
			return (
				<div className="px-20 py-20">
					{renderHeader('Business Type*', 'Select from below')}
					{registrationBusiness.map((item) => (
						<div
							key={item}
							onClick={() =>
								setBusinessInfo(
									null,
									'type',
									item,
									businessInformation?.businessCategory,
									businessInformation?.businessSale,
								)
							}
							className={cn(
								'py-16 border-b border-grey-border text-12 leading-18',
								item === businessInformation?.businessType
									? 'text-blue-primary'
									: '',
							)}
						>
							{item}
						</div>
					))}
				</div>
			);
		} else if (businessInformation?.dropdownType === 'category') {
			return (
				<div className="px-20 py-20">
					{renderHeader('Category*', 'Select from below')}
					{registrationCategories.map((item) => (
						<div
							key={item}
							onClick={() =>
								setBusinessInfo(
									null,
									'type',
									businessInformation?.businessType,
									item,
									businessInformation?.businessSale,
								)
							}
							className={cn(
								'py-16 border-b border-grey-border text-12 leading-18',
								item === businessInformation?.businessCategory
									? 'text-blue-primary'
									: '',
							)}
						>
							{item}
						</div>
					))}
				</div>
			);
		} else if (businessInformation?.dropdownType === 'sale') {
			return (
				<div className="px-20 py-20">
					{renderHeader('Average Montly Sale*', 'Select from below')}
					{registrationSale.map((item) => (
						<div
							key={item}
							onClick={() =>
								setBusinessInfo(
									null,
									'type',
									businessInformation?.businessType,
									businessInformation?.businessCategory,
									item,
								)
							}
							className={cn(
								'py-16 border-b border-grey-border text-12 leading-18',
								item === businessInformation?.businessSale
									? 'text-blue-primary'
									: '',
							)}
						>
							{item}
						</div>
					))}
				</div>
			);
		}
	};

	return (
		<Sheet
			show={businessInformation?.itemType !== null}
			onClose={() => setBusinessInfo(null)}
		>
			{renderDropdown()}
		</Sheet>
	);
};

export default Dropdown;
