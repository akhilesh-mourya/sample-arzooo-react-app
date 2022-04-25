export default function Header(props: { title: string; subtitle: string }) {
	return (
		<>
			<div className="text-24 font-bold tracking-0.29 leading-21 inline-block">
				Sign Up
			</div>
			<div className="text-grey-light text-12 leading-20 mt-4 mb-8">
				{props.title}
			</div>
			<div className="text-12 leading-20 text-blue-primary">
				{props.subtitle}
			</div>
		</>
	);
}
