import { useCartDeleteMutation } from '@/api/cart/use-cart';
import DialogBox from '@/components/atoms/dialog.atom';
import { Transition, Popover } from '@headlessui/react';
import Image from 'next/dist/client/image';
import { Fragment, useState } from 'react';
import Loading from 'src/pages/loading';

const CartButton: React.FC = ({ children }) => {
	return <div className="flex justify-center items-center">{children}</div>;
};

interface CartButtonProps {
	minQuantity: number;
	maxQuantity: number;
	packQuantity: number;
	quantity: number;
	cart_id: number;
}

const CartButtonGroup = (props: CartButtonProps) => {
	const [quantity, setQuantity] = useState<Number>(0);
	const [open, setOpen] = useState(false);
	const { mutate: removeCartItem, isLoading } = useCartDeleteMutation();
	const renderOptions = () => {
		let options = [];
		let i = props.minQuantity;
		if (props.minQuantity && props.maxQuantity && props.packQuantity) {
			while (i <= props.maxQuantity) {
				options.push(i);
				i += props.packQuantity;
			}
		}

		return options;
	};

	const deleteCart = () => {
		removeCartItem(props.cart_id);
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="grid grid-cols-3">
			<DialogBox
				isOpen={open}
				onChange={() => setOpen(!open)}
				title="Are you sure?"
				btnText="Delete"
				submit={() => {
					deleteCart();
					setOpen(!open);
				}}
				cancelBtn={() => setOpen(!open)}
				showButtons
			/>
			<CartButton>
				<div onClick={() => setOpen(true)}>
					<Image height="24" width="24" src="/icons/trash.svg" />
				</div>
			</CartButton>
			<div />
			<Popover className="relative">
				<Popover.Button>
					Qty : {quantity ? quantity : props.quantity}
				</Popover.Button>
				{renderOptions()?.length > 0 && (
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Popover.Panel className="absolute z-10 bg-white shadow h-160 overflow-auto">
							{({ close }) => (
								<div className="grid space-y-1 w-68 h-full">
									{renderOptions().map((i) => (
										<div
											onClick={() => {
												setQuantity(i), close();
											}}
											key={i}
											className="flex justify-center border-b px-2 items-center py-1"
										>
											{i}
										</div>
									))}
								</div>
							)}
						</Popover.Panel>
					</Transition>
				)}
			</Popover>
		</div>
	);
};

export default CartButtonGroup;
