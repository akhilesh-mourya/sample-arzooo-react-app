import React from 'react';
import { useRouter } from 'next/router';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/atoms/carousel.atom';
import { useCategoriesFilters } from '@/api/category/use-offer-categories.api';

const breakpoints = {
	'1500': {
		slidesPerView: 2,
	},
	'0': {
		slidesPerView: 3.8,
	},
};

const Categories = () => {
	const router = useRouter();
	const { query } = router;
	const { data, isLoading, isError } = useCategoriesFilters({ ...query });

	return (
		<div>
			{data?.categoryFilter?.length > 1 ? (
				<Carousel
					breakpoints={breakpoints}
					centeredSlides={false}
					autoplay={{ delay: 0 }}
					className="px-10 pt-10"
					buttonClassName="hidden"
				>
					{data?.categoryFilter?.map((category: any, i) => (
						<SwiperSlide className="carouselItem" key={i}>
							<div className="px-10 border border-grey-stroke mr-10 text-center rounded-full text-14 font-semibold">
								{category.categoryName}
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			) : null}
		</div>
	);
};

export default Categories;
