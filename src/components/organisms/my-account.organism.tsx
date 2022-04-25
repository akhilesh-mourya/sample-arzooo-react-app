import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash.isempty';

import { ROUTES } from '@/helpers/routes.helpers';

const Profile = dynamic(
	() => import('@/molecules/my-account/profile.molecule'),
);
const Business = dynamic(
	() => import('@/molecules/my-account/business.molecule'),
);

const MyAccount = () => {
	const router = useRouter();

	return (
		<div className="mt-8 pb-104 bg-white">
			<div className={cn('flex border-b border-grey-lighter')}>
				{/* tabs for profile and business info */}
				<Link
					href={{
						pathname: ROUTES.MY_ACCOUNT,
						query: { path: 'profile' },
					}}
				>
					<a
						className={cn(
							router?.query?.path === 'profile' ||
								isEmpty(router?.query?.path)
								? 'text-blue-primary border-blue-primary border-b-2'
								: '',
							'text-14 leading-21 font-normal py-10 mx-14',
						)}
					>
						Profile
					</a>
				</Link>
				<Link
					href={{
						pathname: ROUTES.MY_ACCOUNT,
						query: { path: 'business-information' },
					}}
				>
					<a
						className={cn(
							router?.query?.path === 'business-information'
								? 'text-blue-primary border-blue-primary border-b-2'
								: '',
							'text-14 leading-21 font-normal py-10 mx-14',
						)}
					>
						Business Information
					</a>
				</Link>
			</div>
			{isEmpty(router?.query?.path) ||
			router?.query?.path === 'profile' ? (
				<Profile />
			) : null}
			{router?.query?.path === 'business-information' && <Business />}
		</div>
	);
};

export default MyAccount;
