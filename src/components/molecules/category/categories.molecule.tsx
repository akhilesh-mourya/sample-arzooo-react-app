import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash.isempty';

import Checkbox from '@/components/atoms/checkbox.atom';
import { useUI } from '@/context/ui.context';

const Categories = ({ data, filterId }) => {
	const router = useRouter();
	const { setCategories } = useUI();
	const { pathname, query } = router;
	const selectedCategories = query?.options
		? JSON.parse(query?.options as string)
		: {};
	const [formState, setFormState] = useState<any>(selectedCategories);

	useEffect(() => {
		setFormState(selectedCategories);
		setCategories(selectedCategories);
	}, [query?.options]);

	const eventHandlers = {
		handleChange: (
			e: React.FormEvent<HTMLInputElement>,
			filterObj,
		): void => {
			let { value } = e.currentTarget;
			let latestfilterobj = encodeURIComponent(JSON.stringify(filterObj));
			value = value?.toLowerCase();
			//check if ths id exisits in the object
			if (formState[filterId]) {
				// check if the value already exists
				if (value && formState[filterId]?.includes(value)) {
					formState[filterId] = formState[filterId].filter(
						(val) => val !== value,
					);
					if (
						formState &&
						formState[filterId] &&
						formState[filterId].length <= 0
					) {
						delete formState[filterId];
						latestfilterobj = undefined;
					}
				} else if (value && !formState[filterId]?.includes(value)) {
					formState[filterId].push(value);
				}
			} else {
				// if the obj doesnt exist add it
				formState[filterId] = [];
				//check for the value
				if (value) {
					//push that value to the object
					formState[filterId].push(value);
				}
			}
			const { brand, page, ...restQuery } = query;
			router.push(
				{
					pathname,
					query: {
						...restQuery,
						...(!isEmpty(formState)
							? { options: JSON.stringify(formState) }
							: {}),
						// ...(latestfilterobj ? { latestfilterobj } : {}),
					},
				},
				undefined,
				{ scroll: true },
			);
		},
	};

	return (
		<>
			{data?.categoryFilter?.map((filter, idx) => {
				return (
					filterId === filter.attribute_id &&
					filter.attribute_name &&
					filter.filter_option.split(',').map((name) => {
						return (
							<div className="py-10 flex" key={name}>
								<Checkbox
									name={name?.toLowerCase()}
									label={name}
									value={name}
									checked={formState?.[
										filter.attribute_id
									]?.includes(name?.toLowerCase())}
									onChange={(e) =>
										eventHandlers.handleChange(e, filter)
									}
								/>
							</div>
						);
					})
				);
			})}
		</>
	);
};

export default Categories;
