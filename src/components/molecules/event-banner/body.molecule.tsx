import ImageFile from '@/components/atoms/image.atom';
import { openBanner, openProductPage } from '@/helpers/scripts.helpers';

export default function Body({ data }) {
	return (
		<>
			{data?.map((item) => {
				if (
					item?.type === 'event-title-banner' &&
					item?.sequence === 2
				) {
					return (
						<div key={item?.id} className="my-10">
							<ImageFile
								local={false}
								src={`${process.env.NEXT_PUBLIC_PATH}/images/banners/${item?.img_src}`}
								width={62}
								height={13}
								layout="responsive"
								placeholder="blur"
								blurDataURL={`/icons/placeholder_blur_loader.svg`}
							/>
						</div>
					);
				}
			})}
			<div className="grid grid-cols-2 gap-x-8 gap-y-8 mx-8 mb-20">
				{data?.map((item) => {
					console.log(item);

					if (item.type === 'event-bottom-banner') {
						return (
							<div
								key={item?.id}
								className=""
								onClick={
									item?.product_count === 1
										? () =>
												openProductPage(
													window,
													item.title,
													item.product_hash,
												)
										: () =>
												openBanner(
													window,
													item.id,
													item.is_falcon,
												)
								}
							>
								<ImageFile
									local={false}
									src={`${process.env.NEXT_PUBLIC_PATH}/images/banners/${item?.img_src}`}
									width={73}
									height={92}
									layout="responsive"
									className="rounded-6"
									placeholder="blur"
									blurDataURL={`/icons/placeholder_blur_loader.svg`}
								/>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}
