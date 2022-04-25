import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

import { arzooopayStore } from '@/api/api.api';
import { formatPrice } from '@/helpers/utils.helpers';
import Header from '../../arzooopay/header';
import Button from '@/atoms/button.atom';

const list = [
	{ title: 'Netbanking', key: 'netbanking' },
	{ title: 'Credit / Debit Card', key: 'debit' },
	{ title: 'UPI', key: 'upi' },
];

const MakePayment = () => {
	const [url, setUrl] = useState('');
	const router = useRouter();
	const { addToast } = useToasts();
	const [amount, setAmount] = useState(0);
	const [active, setActive] = useState(undefined);
	const [paymentDone, setPaymentDone] = useState(undefined);

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	useEffect(() => {
		if (router.query.id) {
			arzooopayStore(router.query.id, (err, success) => {
				console.log(err, success);

				if (err) {
					addToast('Bad internet connection', {
						appearance: 'error',
						autoDismiss: true,
					});
				} else {
					if (success.status === 'success') {
						setAmount(success.data[0].amount);
					} else {
						setPaymentDone(true);
						addToast(success.msg, {
							appearance: 'error',
							autoDismiss: true,
						});
					}
				}
			});
		}
	}, [router.query]);

	return (
		<div className="max-w-568">
			<Header url={url} />
			{paymentDone ? (
				<h2>Payment is already done for this ID</h2>
			) : (
				<>
					{list.map((l) => {
						return (
							<div
								key={l.key}
								className="p-16 border border-grey-stroke flex items-center"
								onClick={() => setActive(l.key)}
							>
								<div
									className={cn({
										radio: true,
										radio__active: active === l.key,
									})}
								>
									{active === l.key ? <span /> : null}
								</div>
								<div className="font-medium text-18 ml-6">
									{l.title}
								</div>
							</div>
						);
					})}
					<div className="fixed-bottom-btn">
						<div className="side-by-side">
							<div className="w-full font-semibold text-18">
								{formatPrice(amount)}
							</div>
							<Button
								onClick={() =>
									router.push({
										pathname: `/payment-link/arzooopay/${active}`,
										query: {
											id: router.query.id,
											amount: amount,
										},
									})
								}
								disabled={active ? false : true}
								className="w-full h-47 rounded-6 text-16 bg-blue-primary text-white"
							>
								Continue
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

MakePayment.getInitialProps = () => {
	return {
		noAuth: true,
	};
};

export default MakePayment;
