import React from 'react';
import useCollapse from 'react-collapsed';
import cn from 'classnames';

const CollapsableItem = ({ data, index }) => {
	const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
	function NewlineText(mainText) {
		const text = mainText;
		const newText = text.split('\n').map((str) => <p>{str}</p>);
		return newText;
	}
	return (
		<div className="mb-16 border-b-0.5 border-grey-lighter pb-16">
			<button
				{...getToggleProps()}
				className={cn(
					'flex w-full justify-between',
					'focus:outline-none',
				)}
			>
				<div className="font-Poppins text-14 text-left text-black pr-18">
					{data.label}
				</div>
				<img
					src={
						isExpanded
							? '/icons/creditArrowUp.svg'
							: '/icons/creditArrowDown.svg'
					}
					alt="logo"
					style={{ height: 8, width: 12, marginTop: 8 }}
				/>
			</button>
			<section
				{...getCollapseProps()}
				className={cn(
					'mt-10 text-12 font-light text-left font-Poppins text-grey-secondary',
				)}
			>
				<span className="pb-16">{NewlineText(data.answer)}</span>
			</section>
		</div>
	);
};

export default CollapsableItem;
