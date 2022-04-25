import { Tab } from '@headlessui/react';
import cn from 'classnames';

import Benefits from './benifits.molecule';
import Membership from './membership.molecule';

export default function Advantages() {
	return (
		<div className="w-full px-2 py-16">
			<Tab.Group>
				<Tab.List className="flex">
					<Tab
						className={({ selected }) =>
							cn(
								'w-full text-14 leading-5 font-medium py-12 rounded-6',
								selected
									? 'shadow bg-blue-primary text-white font-semibold'
									: '',
							)
						}
					>
						My Membership
					</Tab>
					<Tab
						className={({ selected }) =>
							cn(
								'w-full text-14 leading-5 font-medium py-12 rounded-6',
								selected
									? 'shadow bg-blue-primary text-white font-semibold'
									: '',
							)
						}
					>
						My Benefits
					</Tab>
				</Tab.List>
				<Tab.Panels className="mt-2">
					<Tab.Panel className={cn('bg-white', 'focus:outline-none')}>
						<Membership />
					</Tab.Panel>
					<Tab.Panel className={cn('bg-white', 'focus:outline-none')}>
						<Benefits />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
