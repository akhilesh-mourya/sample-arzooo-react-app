import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Checkbox from '@/components/atoms/checkbox.atom';
import { useUI } from '@/context/ui.context';

const Brands = ({ data }) => {
	const router = useRouter();
	const { setBrands } = useUI();
	const { pathname, query } = router;
	const selectedBrands = query?.brand
		? (query.brand as string).split(',')
		: [];
	const [formState, setFormState] = useState<string[]>(selectedBrands);

	useEffect(() => {
		setFormState(selectedBrands);
		setBrands(selectedBrands);
	}, [query?.brand]);

	const eventHandlers = {
		handleChange: (e: React.FormEvent<HTMLInputElement>): void => {
			const { value } = e.currentTarget;
			let currentFormState = formState.includes(value)
				? formState.filter((i) => i !== value)
				: [...formState, value];
			const { brand, page, ...restQuery } = query;
			router.push(
				{
					pathname,
					query: {
						...restQuery,
						...(!!currentFormState.length
							? { brand: currentFormState.join(',') }
							: {}),
					},
				},
				undefined,
				{ scroll: true },
			);
		},
	};

	return (
		<>
			{data?.brandFilter?.map((brand) => {
				return (
					<div className="py-10 flex" key={brand?.brand_id}>
						<Checkbox
							label={brand?.brand_name}
							name={brand?.brand_name.toLowerCase()}
							checked={formState.includes(brand?.brand_name)}
							value={brand?.brand_name}
							onChange={eventHandlers.handleChange}
						/>
					</div>
				);
			})}
		</>
	);
};

export default Brands;
