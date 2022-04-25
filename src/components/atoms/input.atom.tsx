/**
 * Button Component
 * @param className          styles for button
 * @param inputClassName     classes for the input
 * @param labelKey           label for text
 * @param placeholderKey     placeholder text
 * @param name               name of the input
 * @param errorKey           input error messages
 * @param type               input type
 * @param shadow             weather to show shadow or not
 * @param inputMode          type of input
 * @param suffix             input suffix
 * @param prefix             input prefix
 *
 * Author: Vakadu Vinod
 */

import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	inputClassName?: string;
	labelKey?: any;
	placeholderKey?: string;
	name: string;
	errorKey?: string;
	type?: string;
	shadow?: boolean;
	inputMode?: 'numeric' | 'email' | 'text';
	suffix?: any;
	prefix?: any;
	root?: string;
}
const classes = {
	root:
		'pb-1 pr-4 text-14 text-grey-primary leading-21 w-full outline-none appearance-none transition duration-150 ease-in-out border-b-1.5 min-h-12 transition duration-200 ease-in-out',
	shadow: 'focus:shadow',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className = 'block',
			labelKey,
			name,
			errorKey,
			placeholderKey,
			shadow = false,
			type,
			inputClassName,
			inputMode = 'text',
			suffix,
			prefix,
			root,
			...rest
		},
		ref,
	) => {
		let errorRoot = `${!errorKey ? 'border-grey-stroke' : 'border-red'}`;
		let errorLabel = `${!errorKey ? 'text-grey-primary' : 'text-red'}`;
		const rootClassName = cn(
			classes.root,
			{
				[classes.shadow]: shadow,
			},
			inputClassName,
			errorRoot,
			errorLabel,
		);
		if (inputMode === 'numeric' && type !== 'number') {
			type = 'number';
		} else if (inputMode === 'email' && type !== 'email') {
			type = 'email';
		}
		return (
			<div className={`${className} ${root}`}>
				{labelKey && (
					<label
						htmlFor={name}
						className={`block text-10 mb-2 font-semibold leading-none cursor-pointer ${errorLabel}`}
					>
						{labelKey}
					</label>
				)}
				<div className="flex">
					{suffix ? suffix : null}
					<input
						{...rest}
						id={name}
						name={name}
						type={type}
						ref={ref}
						// @ts-ignore
						placeholder={placeholderKey}
						className={rootClassName}
						autoComplete="off"
						spellCheck="false"
						aria-invalid={errorKey ? 'true' : 'false'}
						inputMode={inputMode}
					/>
					{prefix ? prefix : null}
				</div>
				{errorKey && (
					<p className="my-2 text-12 text-red">{errorKey}</p>
				)}
			</div>
		);
	},
);

export default Input;
