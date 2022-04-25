import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import isEmpty from 'lodash.isempty';

import { ROUTES } from '@/helpers/routes.helpers';
import { useFetchOrders } from '@/api/my-orders/use-orders.api';
import Spinner from '../atoms/spinner.atom';
import UpdateStatus from '../atoms/status.atom';

const History = dynamic(() => import('@/molecules/my-orders/history.molecule'));
const Wip = dynamic(() => import('@/molecules/my-orders/wip.molecule'));

const MyOrders = () => {
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, isError } = useFetchOrders({ ...query });

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return (
			<UpdateStatus
				text="Error Occurred!"
				className="my-20 text-center text-14 leading-21 text-red"
			/>
		);
	}

	return (
		<div className="mt-8 bg-white">
			<div className="flex border-b border-grey-lighter sticky top-0 bg-white z-9">
				<Link
					href={{
						pathname: ROUTES.MY_ORDERS,
						query: { path: 'WIP' },
					}}
				>
					<a
						className={cn(
							router?.query?.path === 'WIP' ||
								isEmpty(router?.query?.path)
								? 'text-blue-primary border-blue-primary border-b-2'
								: '',
							'text-14 leading-21 font-normal py-10 mx-14 flex-1 text-center',
						)}
					>
						In Progress
					</a>
				</Link>
				<Link
					href={{
						pathname: ROUTES.MY_ORDERS,
						query: { path: 'HISTORY' },
					}}
				>
					<a
						className={cn(
							router?.query?.path === 'HISTORY'
								? 'text-blue-primary border-blue-primary border-b-2'
								: '',
							'text-14 leading-21 font-normal py-10 mx-14 flex-1 text-center',
						)}
					>
						Order History
					</a>
				</Link>
			</div>
			{isEmpty(router?.query?.path) || router?.query?.path === 'WIP' ? (
				<Wip data={data?.data} />
			) : null}
			{router?.query?.path === 'HISTORY' && <History data={data?.data} />}
		</div>
	);
};

export default MyOrders;
