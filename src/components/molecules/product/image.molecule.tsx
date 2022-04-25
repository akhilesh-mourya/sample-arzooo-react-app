import React from 'react';
import { SwiperSlide } from 'swiper/react';

import Carousel from '@/atoms/carousel.atom';
import ImageFile from '@/atoms/image.atom';

const breakpoints = {
	'1500': {
		slidesPerView: 2,
	},
	'0': {
		slidesPerView: 1,
	},
};

const Image = (props: {
	display_name: string;
	img_count: number;
	primary_img: number;
	image_cache_key: string;
	img_hash: string;
	is_falcon: number;
	is_express: number;
	parent: string;
}) => {
	let imgCarousel = [];
	imgCarousel.push({
		url:
			props.image_cache_key !== null
				? `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.img_hash}_0${props.primary_img}.jpg?key=${props.image_cache_key}`
				: `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.img_hash}_0${props.primary_img}.jpg`,
	});

	for (let i = 0; i < props.img_count && i < 10; ++i) {
		if (i !== props.primary_img)
			imgCarousel.push({
				url:
					props.image_cache_key !== null
						? `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.img_hash}_0${i}.jpg?key=${props.image_cache_key}`
						: `${process.env.NEXT_PUBLIC_PATH}/images/products/${props.img_hash}_0${i}.jpg`,
			});
	}

	return (
		<div className="bg-white px-16 relative">
			{props.is_falcon === 0 && props.is_express === 1 && (
				<div className="absolute w-104 h-32 z-2">
					<ImageFile
						local={false}
						src="https://static.arzooo.com/native-app/express.jpg"
						width={100}
						height={32}
						objectFit="contain"
					/>
				</div>
			)}
			{/* {props.parent === 'air-conditioner' && (
				<div className="absolute w-120 h-40 z-2">
					<ImageFile
						local={false}
						src="https://static.arzooo.com/native-app/product Banner-05.png"
						width={120}
						height={38}
						objectFit="contain"
					/>
				</div>
			)} */}
			<Carousel
				breakpoints={breakpoints}
				centeredSlides={true}
				autoplay={{ delay: 0 }}
				className="mx-0"
				buttonClassName="hidden"
				pagination={{
					clickable: true,
				}}
			>
				{imgCarousel?.map((banner: any, i) => (
					<SwiperSlide className="carouselItem" key={i}>
						<div className="flex items-center justify-center flex-1 h-316">
							<img
								src={banner.url}
								style={{ objectFit: 'contain', height: 280 }}
							/>
						</div>
						{/* <ImageFile
							local={false}
							src={banner.url}
							layout="responsive"
							width={4}
							height={3}
							objectFit="contain"
						/> */}
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};

export default Image;
