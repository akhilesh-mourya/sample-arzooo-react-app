import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

export const useDebouncedInput = (delay?: number) => {
	const [inputValue, setInputValue] = useState<string>('');
	const [filterValue, setFilterValue] = useState<string>('');
	const [filterLoading, setFilterLoading] = useState(false);
	const debouncedSetFilterValue = useCallback(
		debounce((value) => {
			setFilterLoading(false);
			setFilterValue(value);
		}, delay ?? 1000),
		[],
	);
	return {
		inputValue,
		filterValue,
		filterLoading,
		debouncedSetFilterValue,
		setFilterLoading,
		setInputValue,
	};
};
