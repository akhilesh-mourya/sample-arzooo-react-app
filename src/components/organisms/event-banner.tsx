import React from 'react';
import { useRouter } from 'next/router';

import { useEventBanner } from '@/api/category/use-event-banner.api';
import Spinner from '@/atoms/spinner.atom';
import UpdateStatus from '@/atoms/status.atom';
import Header from '@/molecules/event-banner/header.molecule';
import Body from '@/molecules/event-banner/body.molecule';

const EventBanner = () => {
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, isError } = useEventBanner({ ...query });

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
		<div className="my-10">
			<Header data={data?.childBannerDetail} />
			<Body data={data?.childBannerDetail} />
		</div>
	);
};

export default EventBanner;
