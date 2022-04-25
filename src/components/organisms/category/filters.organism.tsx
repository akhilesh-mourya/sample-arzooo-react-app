import React from 'react';
import { useRouter } from 'next/router';

import { useCategoryFilters } from '@/api/category/use-filters.api';
import { FilterIcon, SortAscendingIcon } from '@heroicons/react/outline';
import { useUI } from '@/context/ui.context';
import Button from '@/components/atoms/button.atom';
import { CONSTANTS } from '@/helpers/persistent.helpers';

const Filters = () => {
	const router = useRouter();
	const { query } = router;
	const { setSheetView, openSheet, setSheetData } = useUI();
	const { data, isLoading, isError } = useCategoryFilters({ ...query });

	const eventHandlers = {
		sort: () => {
			setSheetView(CONSTANTS.SORT_FILTER);
			return openSheet();
		},
		category: () => {
			setSheetData(data);
			setSheetView(CONSTANTS.CATEGORY_FILTER);
			return openSheet();
		},
	};

	return (
		<div className="h-56 bg-white fixed bottom-0 w-full border-t border-grey-border shadow-2">
			<div className="grid grid-cols-2 h-full">
				<Button
					onClick={eventHandlers.sort}
					className="border-r border-grey-stroke text-14 font-semibold leading-21 flex items-center justify-center"
				>
					<SortAscendingIcon className="w-18 h-18 mr-6" />
					SORT
				</Button>
				<Button
					onClick={eventHandlers.category}
					className="text-14 font-semibold leading-21 flex items-center justify-center"
				>
					<FilterIcon className="w-18 h-18 mr-6" />
					FILTERS
				</Button>
			</div>
		</div>
	);
};

export default Filters;
