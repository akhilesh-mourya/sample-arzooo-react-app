/**
 * Checkbox component
 * @param className          styles for checkbox
 * @param labelClassName     styles for label
 * @param label              label text
 * @param name               input name
 * @param errorKey           errors for the checkbox
 *
 * Author: Vakadu Vinod
 */

import React, { InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	labelClassName?: string;
	label?: any;
	name: string;
	errorKey?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
	(
		{ className = 'block', label, name, errorKey, labelClassName, ...rest },
		ref,
	) => {
		return (
			<div className={className}>
				<label className="cursor-pointer relative flex items-center justify-center">
					<input
						type="checkbox"
						className="rounded-4"
						ref={ref}
						{...rest}
					/>
					<div className={cn(labelClassName, 'pl-6')}>{label}</div>
				</label>
				{errorKey && (
					<p className="my-2 text-12 text-red">{errorKey}</p>
				)}
			</div>
		);
	},
);

export default Checkbox;
