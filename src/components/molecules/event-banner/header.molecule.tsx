import ImageFile from '@/atoms/image.atom';

export default function Header({ data }) {
	return (
		<>
			{data?.map((item) => {
				if (item?.type === 'event-top-banner') {
					return (
						<ImageFile
							key={item?.id}
							local={false}
							src={`${process.env.NEXT_PUBLIC_PATH}/images/banners/${item?.img_src}`}
							width={105}
							height={47}
							layout="responsive"
							placeholder="blur"
							blurDataURL={`/icons/placeholder_blur_loader.svg`}
						/>
					);
				}
			})}
		</>
	);
}
