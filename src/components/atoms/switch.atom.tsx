/**
 * Swich component
 *
 * @param label          accepts string for label
 * @param checked        to toggle switch
 * @param onChange       function on change
 * @param labelCss       css for label
 * @param name           name for switch
 *
 * Author: Vakadu Vinod
 */

import React from 'react';
import { Switch } from '@headlessui/react';
import cn from 'classnames';

const Toggle = (props: {
	label: string;
	checked: boolean;
	onChange?: any;
	labelCss?: string;
	name?: string;
}) => {
	return (
		<Switch.Group>
			<div className="flex items-center">
				<Switch.Label className={cn(props.labelCss, 'mr-10')}>
					{props.label}
				</Switch.Label>
				<Switch
					name={props.name}
					checked={props.checked}
					onChange={props.onChange}
					className={`${
						props.checked ? 'bg-blue-primary' : 'bg-grey-secondary'
					} relative inline-flex items-center rounded-full w-36 h-20 focus:outline-none`}
				>
					<span
						className={`${
							props.checked ? 'translate-x-18' : 'translate-x-1'
						} inline-block w-14 h-14 transform bg-white rounded-full transition-transform`}
					/>
				</Switch>
			</div>
		</Switch.Group>
	);
};

export default Toggle;
