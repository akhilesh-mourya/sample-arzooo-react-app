import React, { useState } from 'react';
import cn from 'classnames';

import { useUI } from '@/context/ui.context';
import Button from '@/components/atoms/button.atom';
import Brands from '@/molecules/category/brands.molecule';
import Categories from '@/molecules/category/categories.molecule';
import ImageFile from '@/atoms/image.atom';

const CategoryFilter = () => {
	const [filterId, setFilterId] = useState<number>(1);
	const { closeSheet, sheetData, brands, categories } = useUI();

	return (
		<div className="w-full py-20">
			<div className="flex items-center border-b border-grey-stroke pb-10 px-15">
				<div className="flex" onClick={closeSheet}>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				<div className="text-16 font-semibold leading-21 pl-20">
					Filters
				</div>
			</div>
			<div className="h-70vh pb-64">
				<div className="w-150 fixed h-full bg-grey-bg ">
					<div
						onClick={() => setFilterId(1)}
						className={cn(
							'pl-15 py-10 text-14 leading-21',
							filterId === 1
								? 'bg-white text-blue-primary font-semibold'
								: null,
						)}
					>
						Brands
					</div>
					{sheetData?.categoryFilter?.map((cat, idx) => {
						return (
							<div
								onClick={() => setFilterId(cat.attribute_id)}
								key={idx}
								className={cn(
									'pl-15 py-10 text-14 leading-21',
									filterId === cat.attribute_id
										? 'bg-white text-blue-primary font-semibold'
										: null,
								)}
							>
								{cat?.attribute_name}
							</div>
						);
					})}
				</div>
				<div className="ml-160 overflow-y-scroll h-full pl-10">
					{filterId === 1 && <Brands data={sheetData} />}
					<Categories data={sheetData} filterId={filterId} />
				</div>
			</div>
			<div className="h-56 z-1 fixed w-full left-0 bottom-0 shadow-2 bg-white">
				<div className="grid grid-cols-2 px-10 h-full">
					<div className="flex items-center text-14 leading-21 font-semibold">
						81 Products
					</div>
					<div className="flex items-center justify-center">
						<Button className="bg-blue-primary h-42 w-full text-white rounded-6 flex items-center justify-center uppercase text-16 font-semibold leading-24">
							Apply
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryFilter;
