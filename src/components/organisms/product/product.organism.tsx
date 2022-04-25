import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useProduct } from '@/api/product/use-product.api';
import { useProductDetails } from '@/api/product/use-product-details.api';
import Spinner from '@/atoms/spinner.atom';
import Image from '@/molecules/product/image.molecule';
import Title from '@/molecules/product/title.molecule';
import Pricing from '@/molecules/product/price.molecule';
import ShareDeal from '@/molecules/product/share-deal.molecule';
import QuantityButtons from '@/molecules/product/quantity-buttons.molecule';
import OutOfStock from '@/molecules/product/out_of_stock.molecule';
import FinalProductsPrice from '@/molecules/product/final_price.molecule';
import UpdateStatus from '@/atoms/status.atom';
import { useUI } from '@/context/ui.context';
import Offers from '@/components/molecules/product/offers.molecule';

const ProductCard = dynamic(() => import('@/atoms/loaders/product.atom'));
const Features = dynamic(() => import('@/molecules/product/features.molecule'));
const Policies = dynamic(() => import('@/molecules/product/polices.molecule'));
const Buttons = dynamic(() => import('@/molecules/product/buttons.molecule'));

const Product = () => {
	const router = useRouter();
	const [productDetails, setProductDetails] = useState(null);
	const { query } = router;
	const { data, isLoading, isError, refetch } = useProduct({ ...query });
	const {
		data: detailsData,
		isLoading: loader,
		isError: error,
	} = useProductDetails({ ...query });
	const { setProductData } = useUI();

	useEffect(() => {
		setProductData(data);
		configureProductDetails(data);
	}, [data]);

	const configureProductDetails = (productData) => {
		if (productData && productDetails === null) {
			let newProjData = productData;
			let mod_value: any;
			newProjData.quantity = productData.min_quantity;
			// If sales quantity or final price of product is 0 then we will mark it as Out Of Stock
			if (
				newProjData.finalPrice === 0 ||
				newProjData.sales_quantity === 0
			) {
				newProjData.outOfStock = 1;
			} else {
				// If product quantity is larger then maximum selling quantity then quantity will be max quantity
				if (
					newProjData.quantity > newProjData.max_quantity &&
					newProjData.max_quantity > 0
				) {
					newProjData.quantity = newProjData.max_quantity;
				}
				// If product quantity is Greater then pack quantity(factor for increasing or decreasing Qty) then set Quantity to nearest factor of pack qty
				if (newProjData.quantity > newProjData.pack_quantity) {
					mod_value =
						newProjData.quantity % newProjData.pack_quantity;
					newProjData.quantity = newProjData.quantity - mod_value;
				}
				// If product quantity is less then pack quantity then set pack Qty as quantity
				if (newProjData.quantity < newProjData.pack_quantity) {
					newProjData.quantity = newProjData.pack_quantity;
				}
				// If quantity is greater then saled quantity then make quantity equal to sales quantity as quantity can't be greater then sales quantity
				if (newProjData.sales_quantity !== null) {
					if (newProjData.quantity > newProjData.sales_quantity) {
						newProjData.quantity = newProjData.sales_quantity;
						newProjData.min_quantity = 1;
					}
				}
			}
			setProductDetails(newProjData);
		}
	};

	if (isLoading || !data) {
		return <ProductCard />;
	}

	if (isError) {
		return (
			<UpdateStatus
				className="text-center text-14 text-red mt-50"
				text="Error occured!"
			/>
		);
	}

	if (data.msg === 'No matching Product was found') {
		return (
			<UpdateStatus
				className="text-center text-14 text-red mt-50"
				text="Product not found!"
			/>
		);
	}

	return (
		<div className="mb-56">
			<Image
				display_name={data?.display_name}
				img_count={data?.img_count}
				primary_img={data?.primary_img}
				image_cache_key={data?.image_cache_key}
				img_hash={data?.img_hash}
				is_falcon={data?.falcon_product}
				is_express={data?.isExpress}
				parent={data?.parent}
			/>
			<Title display_name={data?.display_name} />
			{/* {data?.falcon_product === 0 && (
				<div className="flex bg-white justify-end pr-10">
					<ImageFile
						src={`${process.env.NEXT_PUBLIC_PATH}/native-app/logos/falcon-icon.png`}
						local={false}
						width={18}
						height={18}
					/>
				</div>
			)} */}
			<div className="flex bg-white justify-between">
				<Pricing
					finalPrice={data?.finalPrice}
					retail_price={data?.retail_price}
					quantity={
						productDetails && productDetails.quantity
							? productDetails.quantity
							: data?.quantity
					}
					data={data}
				/>
				{!isLoading && productDetails ? (
					productDetails.outOfStock === 1 ? (
						<OutOfStock />
					) : (
						<QuantityButtons
							productDetails={productDetails}
							setProductDetails={setProductDetails}
						/>
					)
				) : null}
			</div>
			<FinalProductsPrice
				price={data?.finalPrice}
				quantity={
					productDetails && productDetails.quantity
						? productDetails.quantity
						: data?.quantity
				}
				data={data}
			/>
			<ShareDeal />
			<Offers
				parent={data?.parent}
				delivery_time={data?.delivery_time}
				model_name={data?.model_name}
			/>
			{error ? null : loader ? (
				<Spinner fixed={false} />
			) : (
				<Features details={detailsData} />
			)}
			<Policies />
			<Buttons
				refetch={refetch}
				product_id={data?.product_id}
				display_name={data?.display_name}
				img_hash={data?.img_hash}
				model_name={data?.model_name}
				quantity={productDetails?.quantity}
				finalPrice={data?.finalPrice}
				parent={data?.parent}
				sales_quantity={data?.sales_quantity}
				is_express={data?.isExpress}
				out_of_stock={productDetails?.outOfStock}
			/>
		</div>
	);
};

export default Product;
