import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { arzooopay } from '@/api/api.api';
import { formatPrice } from '@/helpers/utils.helpers';
import redirect from '@/services/redirect';
import Header from '../../../arzooopay/header';
import Button from '@/atoms/button.atom';
import Loader from '@/atoms/spinner.atom';
import Input from '@/atoms/input.atom';

interface IFormInputs {
	upi: string;
}

const Upi = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { addToast } = useToasts();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInputs>({
		mode: 'onSubmit',
	});

	const onSubmit = (data) => {
		let paymentData = { paymentId: router.query.id };
		arzooopay(paymentData, (err, success) => {
			if (err) {
				addToast('Bad internet connection', {
					appearance: 'error',
					autoDismiss: true,
				});
			} else {
				if (success.status === 'success') {
					setLoading(true);
					let upiData = { vpa: data.upi };
					redirect(success.data.paymentObj, upiData, 'upi');
				} else {
					addToast('Something went wrong in server', {
						appearance: 'info',
						autoDismiss: true,
					});
				}
			}
		});
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="px-10">
			<div className="max-w-568">
				<Header url="" />
			</div>
			<div className="font-semibold text-18 my-12">Enter Your UPI Id</div>
			<form className="mb-90" onSubmit={handleSubmit(onSubmit)}>
				<div className="arzooo-row">
					<div className="arzooo-col-12">
						<Input
							labelKey="Enter your VPA"
							placeholderKey="9999999999@bank"
							className="mb-15"
							{...register('upi', {
								required: `${'field is required'}`,
							})}
							errorKey={errors.upi?.message}
						/>
					</div>
				</div>
				<div className="fixed-bottom-btn">
					<div className="side-by-side">
						<div className="font-semibold text-18 w-full">
							{formatPrice(router.query.amount)}
						</div>
						<Button className="w-full h-47 rounded-6 text-16 bg-blue-primary text-white">
							PAY NOW
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

Upi.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Upi;
