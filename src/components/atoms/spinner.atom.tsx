/**
 * Spinner Component
 * this componnet just shows a spinner
 *
 * Author: Vakadu Vinod
 */

import cn from 'classnames';

export default function Spinner({ fixed = true }) {
	return (
		<div
			className={cn(
				fixed
					? 'fixed z-100 w-full h-full top-0 left-0 bg-black opacity-60'
					: 'relative',
				'overflow-auto flex justify-center items-center',
			)}
		>
			<div className="w-full rounded-8 flex justify-center items-center py-10">
				<div className="w-32 h-32 pointer-events-none rounded-full loader"></div>
				<div></div>
			</div>
		</div>
	);
}
