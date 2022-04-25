/**
 * Button Component
 * @param className      styles for button
 * @param active         is the button active or not, not used regurlarly
 * @param type           different types of submit
 * @param loading        show loader when this is true
 * @param disabled       disable during loading
 *
 * Author: Vakadu Vinod
 */

import cn from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	active?: boolean;
	type?: 'submit' | 'reset' | 'button';
	loading?: boolean;
	disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		className,
		children,
		active,
		loading = false,
		disabled = false,
		...rest
	} = props;

	const rootClassName = cn(
		'cursor-pointer transition ease-in-out duration-300 focus-visible:outline-none focus:outline-none',
		{
			'cursor-not-allowed': loading,
			'cursor-not-allowed hover:cursor-not-allowed bg-grey-stroke text-grey-secondary': disabled,
		},
		className,
	);

	return (
		<button
			aria-pressed={active}
			ref={ref}
			className={rootClassName}
			disabled={disabled}
			{...rest}
		>
			{children}
			{loading && (
				<svg
					className="animate-spin -me-1 ms-3 h-18 w-18 text-white inline"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			)}
		</button>
	);
});

export default Button;
