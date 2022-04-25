import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

const BuyCreditDetails = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [swiper, setSwiper] = useState(null);

	const onChangeIndex = (newIndex) => {
		setSelectedIndex(newIndex);
		swiper.slideTo(newIndex);
	};
	return (
		<div className="pt-20 bg-white">
			<div className="text-left text-black text-28 px-20">
				How to buy with
			</div>
			<div className="text-left text-blue-text text-28 font-semibold px-20">
				Arzooo Credit
			</div>
			<div className="w-full py-16">
				<Tab.Group
					selectedIndex={selectedIndex}
					onChange={onChangeIndex}
				>
					<Tab.List className="flex px-5">
						{['Step 1', 'Step 2', 'Step 3'].map((step) => (
							<Tab
								key={step}
								className={({ selected }) =>
									cn(
										'w-full text-14 font-medium py-12',
										'focus:outline-none',
										selected
											? 'text-blue-slider font-bold border-blue-slider border-b-2.5'
											: '',
									)
								}
							>
								{step}
							</Tab>
						))}
					</Tab.List>
				</Tab.Group>
			</div>
			<div className="flex justify-center credit-swiper">
				<Swiper
					loop={false}
					autoplay={false}
					onSlideChange={(s) => setSelectedIndex(s.activeIndex)}
					onSwiper={(s) => setSwiper(s)}
				>
					<SwiperSlide>
						<div
							className="justify-center flex"
							style={{ flexDirection: 'column' }}
						>
							<div className="flex pl-10">
								<span className="text-left text-black text-20">
									Select&nbsp;
									<span className="text-left text-blue-text text-20 font-semibold">
										Buy Now
									</span>
								</span>
							</div>
							<div className="text-black text-14 font-normal text-center py-20 pt-10 pl-10 flex text-left">
								Selection of the product the user wants to buy
							</div>
							<div
								className="w-full bg-overlay-slider1 flex justify-center h-450 px-20"
								style={{ maxHeight: 450 }}
							>
								<img
									src={'/images/creditStep1.png'}
									style={{ maxWidth: 320, maxHeight: 480 }}
								/>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className="justify-center flex"
							style={{ flexDirection: 'column' }}
						>
							<div className="flex pl-10">
								<span className="text-left text-black text-20">
									Select&nbsp;
									<span className="text-left text-blue-text text-20 font-semibold">
										Arzooo Credit
									</span>
								</span>
							</div>
							<div
								className="text-black text-14 font-normal py-20 w-full text-left pl-10"
								style={{ maxWidth: 360 }}
							>
								Highlight the checkbox that mentions Arzooo
								Credit with available balance and prompt the
								user to select it
							</div>
							<div
								className="w-full bg-overlay-slider2 items-center h-450"
								style={{ maxHeight: 450 }}
							>
								<img
									src={'/images/creditStep2.png'}
									style={{ maxWidth: 320, maxHeight: 480 }}
								/>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className="justify-center flex"
							style={{ flexDirection: 'column' }}
						>
							<div className="flex pl-10">
								<span className="text-left text-black text-20">
									Select&nbsp;
									<span className="text-left text-blue-text text-20 font-semibold">
										Accept
									</span>
								</span>
							</div>
							<div
								className="text-black text-14 font-normal py-20 w-full pt-10 text-left pl-10"
								style={{ maxWidth: 375 }}
							>
								Highlight the final confirmation of checkout
							</div>
							<div
								className="w-full bg-overlay-slider3 items-center h-450"
								style={{ maxHeight: 450 }}
							>
								<img
									src={'/images/creditStep3.png'}
									style={{ maxWidth: 320, maxHeight: 480 }}
								/>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default BuyCreditDetails;
