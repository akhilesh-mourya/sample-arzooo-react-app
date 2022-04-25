import ImageFile from '@/components/atoms/image.atom';
import Rupee from '@/components/atoms/rupee.atom';
import CartButtonGroup from './cart-buttons.molecule';
import CartDivider from './cart-divider.molecule';

interface CartCardProps {
	name: string;
	productHash: string;
	finalPrice: number;
	retailPrice: number;
	imgHash: string;
	minQuantity: number;
	maxQuantity: number;
	packQuantity: number;
	quantity: number;
	cart_id: number;
}

const CartCard: React.FC<CartCardProps> = (props) => {
	return (
		<div className="rounded bg-white w-full p-8">
			<div className="flex">
				<div className="flex-2">
					<div className="md:w-full line-clamp-2">{props.name}</div>
					<div className="text-grey-text">{props.productHash}</div>
					<div className="py-5 space-x-2">
						<Rupee money={props.finalPrice} className="" />
						<del className="text-grey-text">
							<Rupee money={props.retailPrice} className="" />
						</del>
					</div>
				</div>
				<div className="h-64 flex-1 flex justify-end">
					<ImageFile
						local={false}
						src={`${process.env.NEXT_PUBLIC_PATH}/images/products/${props.imgHash}`}
						width={120}
						height={60}
						objectFit="contain"
					/>
				</div>
			</div>
			<CartDivider />
			<CartButtonGroup {...props} />
		</div>
	);
};

export default CartCard;
