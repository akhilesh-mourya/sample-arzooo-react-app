import ProductCardLoader from './product-card-grid-loader';

interface Props {
	limit?: number;
	uniqueKey?: string;
}

const ProductFeedLoader = ({ limit = 3, uniqueKey = 'product' }: Props) => {
	return (
		<>
			{Array.from({ length: limit }).map((_, idx) => (
				<ProductCardLoader
					key={idx}
					uniqueKey={`${uniqueKey}-${idx}`}
				/>
			))}
		</>
	);
};

export default ProductFeedLoader;
