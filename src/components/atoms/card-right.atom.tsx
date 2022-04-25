import ImageFile from '@/atoms/image.atom';

export default function CardRight(props: {
	title: string;
	img: string;
	onClick: () => void;
	subtitle?: string;
}) {
	return (
		<div
			className="m-10 border border-grey-stroke rounded-6 p-15 flex items-center justify-between"
			onClick={props.onClick}
		>
			<div className="text-15 font-semibold">
				{props.title}
				<span className="text-12 pl-6 text-red">{props.subtitle}</span>
			</div>
			<ImageFile src={props.img} width={30} height={30} />
		</div>
	);
}
