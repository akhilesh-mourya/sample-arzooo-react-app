/**
 * Radio Component
 * @param data               send type of array
 * @param rootClassname      root classnames
 * @param radioClass         classes for radio
 * @param selected           seletded radio
 * @param onChange           onchange for radio input
 *
 * Author: Vakadu Vinod
 */

import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';

export default function Radio(props: {
	data: any;
	rootClassname?: string;
	radioClass?: string;
	selected: string;
	onChange: any;
}) {
	return (
		<div className={cn('w-full', props.rootClassname)}>
			<div className="w-full">
				<RadioGroup value={props.selected} onChange={props.onChange}>
					<div className="space-y-2">
						{props?.data?.map((d) => {
							return (
								<RadioGroup.Option key={d?.id} value={d?.title}>
									{({ active, checked }) => (
										<div className="flex items-center justify-between w-full cursor-pointer">
											<div
												className={cn(
													'flex items-center',
													props.radioClass,
												)}
											>
												<RadioGroup.Label
													as="span"
													className="font-normal text-14 leading-21 text-black"
												>
													{d?.desc}
												</RadioGroup.Label>
												<div className="flex-shrink-0">
													{!checked ? (
														<div className="w-20 h-20 rounded-full border border-grey-secondary"></div>
													) : (
														<CheckIcon className="w-20 h-20" />
													)}
												</div>
											</div>
										</div>
									)}
								</RadioGroup.Option>
							);
						})}
					</div>
				</RadioGroup>
			</div>
		</div>
	);
}

function CheckIcon(props) {
	return (
		<svg viewBox="0 0 24 24" fill="none" {...props}>
			<circle cx={12} cy={12} r={12} fill="#22C0E7" opacity="1" />
			<path
				d="M7 13l3 3 7-7"
				stroke="#fff"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
