import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { useUI } from '@/context/ui.context';
import ImageFile from '@/atoms/image.atom';
import { SORT_OPTIONS } from '@/helpers/persistent.helpers';

type Option = {
	name: string;
	value: string;
};

const SortFilter = () => {
	const { closeSheet } = useUI();
	const router = useRouter();
	const { pathname, query } = router;
	const currentSelectedItem = query?.sort_by
		? SORT_OPTIONS.find((o) => o.value === query.sort_by)!
		: SORT_OPTIONS[0];
	const [selectedItem, setSelectedItem] = useState<Option>(
		currentSelectedItem,
	);

	useEffect(() => {
		setSelectedItem(currentSelectedItem);
	}, [query?.sort_by]);

	const handleItem = (options: Option) => {
		setSelectedItem(options);
		const { sort_by, page, ...restQuery } = query;
		router.replace(
			{
				pathname,
				query: {
					...restQuery,
					...(options.value !== SORT_OPTIONS[0].value
						? { sort_by: options.value }
						: {}),
				},
			},
			undefined,
			{ scroll: false },
		);
		closeSheet();
	};

	return (
		<div className="w-full py-20">
			<div className="flex items-center border-b border-grey-stroke py-10 px-15">
				<div className="flex" onClick={closeSheet}>
					<ImageFile src="back.svg" width={24} height={24} />
				</div>
				<div className="text-16 font-semibold leading-21 pl-20">
					Sort By
				</div>
			</div>
			<div className="my-20 px-15">
				{SORT_OPTIONS.map((option) => {
					return (
						<div
							key={option.value}
							onClick={() => handleItem(option)}
							className={cn(
								'pb-20 text-14 leading-21',
								selectedItem.value === option.value
									? 'font-semibold text-blue-primary'
									: '',
							)}
						>
							{option.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SortFilter;
