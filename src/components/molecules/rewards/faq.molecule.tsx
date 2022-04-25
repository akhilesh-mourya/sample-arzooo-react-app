import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

import { faqData } from '@/constants/rewardsFaq.constants';

export default function Faq() {
	return (
		<div className="w-full px-4 pt-16">
			<div className="px-10 text-16 font-semibold">FAQs</div>
			<div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
				{faqData.map((data, index) => {
					return (
						<Disclosure
							as="div"
							className="mb-10 border border-grey-stroke rounded-6"
							key={index}
						>
							{({ open }) => (
								<>
									<Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-14 text-left rounded-lg">
										<span className="flex flex-1 pr-8 px-8">
											{data.title}
										</span>
										<ChevronUpIcon
											className={`${
												open
													? 'transform rotate-180'
													: ''
											} w-18 h-18 text-grey-secondary flex`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="px-10 pt-4 pb-2 text-14">
										{data.data}
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					);
				})}
			</div>
		</div>
	);
}
