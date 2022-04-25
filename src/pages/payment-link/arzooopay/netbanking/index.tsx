import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useToasts } from 'react-toast-notifications';

import { bankList } from '@/api/static.api';
import { arzooopay } from '@/api/api.api';
import { formatPrice } from '@/helpers/utils.helpers';
import redirect from '@/services/redirect';
import Header from '../../../arzooopay/header';
import Button from '@/atoms/button.atom';
import Loader from '@/atoms/spinner.atom';

const Netbanking = () => {
	const [active, setActive] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { addToast } = useToasts();
	const { handleSubmit } = useForm({
		mode: 'onSubmit',
	});

	const onSubmit = () => {
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
					const data = { code: active };
					redirect(success.data.paymentObj, data, 'nb');
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
			<div className="font-semibold text-18 my-12">Select Bank</div>
			<form className="mb-90" onSubmit={handleSubmit(onSubmit)}>
				{bankList.map((bank) => {
					return (
						<div
							key={bank.value}
							className="p-16 border border-grey-stroke flex items-center"
							onClick={() => setActive(bank.value)}
						>
							<div
								className={cn({
									radio: true,
									radio__active: active === bank.value,
								})}
							>
								{active === bank.value ? <span /> : null}
							</div>
							<div className="ml-6 font-semibold text-18">
								{bank.name}
							</div>
						</div>
					);
				})}
				<div className="fixed-bottom-btn">
					<div className="side-by-side">
						<div className="font-semibold text-18 w-full">
							{formatPrice(router.query.amount)}
						</div>
						<Button
							className="w-full h-47 rounded-6 text-16 bg-blue-primary text-white"
							disabled={active ? false : true}
						>
							PAY NOW
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

Netbanking.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default Netbanking;
