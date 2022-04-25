/**
 * Registration final page terms and conditions
 * accepting this user will be able to proceed
 * you get all the details of registration here and
 * on submit u call the registration api
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Checkbox from '@/components/atoms/checkbox.atom';
import Button from '@/components/atoms/button.atom';
import { useRegistration } from '@/context/ui.registration';
import { useRegisterMutation } from '@/api/registration/use-user-register';
import Spinner from '@/components/atoms/spinner.atom';

const RegistrationTerms = () => {
	const router = useRouter();
	const [checked, setChecked] = useState(false);
	const { mutate: registerUser, isLoading } = useRegisterMutation();
	const {
		firmInformation,
		businessInformation,
		kycInfo,
		storeImages,
		isDeclaration,
	} = useRegistration();

	const handleChange = (e) => {
		setChecked(!checked);
	};

	const submit = () => {
		let data = {
			firm_name: firmInformation?.firm_name,
			mobile_number: firmInformation?.mobile_number,
			owner_name: firmInformation?.owner_name,
			email: firmInformation?.email,
			pincode: firmInformation?.pincode,
			city: firmInformation?.city,
			state: firmInformation?.state,
			address: firmInformation?.address,
			referalcode: firmInformation?.referalcode,
			category: businessInformation?.businessCategory,
			type: businessInformation?.businessType,
			store_potential: businessInformation?.businessSale,
			gstin: kycInfo?.gstNumber,
			pan: kycInfo?.panNumber,
			tnc: checked,
			gstDeclaration: isDeclaration,
		};
		const formdata = new FormData() as any;
		formdata?.append(
			'pan_image',
			kycInfo?.panImage,
			kycInfo?.panImage?.name,
			kycInfo?.panImage?.type,
		);
		formdata?.append(
			'shop_image',
			storeImages?.store1Image?.[0],
			storeImages?.store1Image?.[0]?.name,
			storeImages?.store1Image?.[0]?.type,
		);
		formdata?.append(
			'shop_image',
			storeImages?.store2Image?.[0],
			storeImages?.store2Image?.[0]?.name,
			storeImages?.store2Image?.[0]?.type,
		);
		formdata?.append(
			'shop_image',
			storeImages?.store3Image?.[0],
			storeImages?.store3Image?.[0]?.name,
			storeImages?.store3Image?.[0]?.type,
		);
		if (kycInfo?.gstImage) {
			for (const key of Object.keys(kycInfo?.gstImage)) {
				formdata?.append(
					'gst_image',
					kycInfo?.gstImage[key],
					kycInfo?.gstImage[key]?.name,
					kycInfo?.gstImage[key]?.type,
				);
			}
		}
		Object.keys(data).forEach((key) => {
			formdata?.append(key, data[key]);
		});
		registerUser(formdata);
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="py-16 bg-white">
			<div className="text-24 leading-21 tracking-0.29 text-center font-bold mb-30">
				Terms and Conditions
			</div>
			<div className="max-h-322 bg-grey-bg min-h-322 mx-5 py-20 px-8 overflow-y-scroll rounded-6">
				<div className="text-8 leading-12">
					<div className="flex">
						<span>1. </span>
						<span>
							By checking the Submit button below, I hereby agree
							and acknowledge that I
							<div className="pl-8">
								a. Can understand, read and write in the English
								language,
							</div>
							<div className="pl-8">
								b. Have read and understood the terms and
								conditions contained below (“Terms”).
							</div>
						</span>
					</div>
					<div className="flex">
						<span>2.</span>
						<span>
							I agree that my action of entering the details and
							clicking the “Submit” button, constitutes a valid
							acceptance by me of the Terms contained herein and
							creates a binding and enforceable agreement between
							me and Arzooo.
						</span>
					</div>
					<div className="flex">
						<span>3.</span>
						<span>
							I declare that all the particulars and information
							provided by me are true, correct, complete and up
							to-date in all respects and that I have not withheld
							any information whatsoever.
						</span>
					</div>
					<div className="flex">
						<span>4.</span>
						<span>
							I confirm that I have/had no insolvency proceedings
							against me nor have I ever been adjudicated
							insolvent by any court or other authority and I
							further confirm that I have read the information on
							credits made available by Arzooo
						</span>
					</div>
					<div className="flex">
						<span>5.</span>
						<span>
							I authorize Arzooo to exchange, share all
							information, documents , KYC and details as provided
							by me and in relation to my existing loans and/or
							repayment history to any third party including but
							not limited to its group companies, service
							providers, banks, financial institutions, credit
							bureaus, telecommunication companies, statutory
							bodies, business partners etc. for customer
							verification, personalization of products or
							services, credit rating, data enrichment, marketing
							or promotion of Arzooo services or related products
							or that of its associates/business partners and
							affiliates or for enforcement of your obligations
							and I shall not hold Arzooo (or any of its group
							companies or its/their agents/representatives/
							business partners) liable for the use/sharing of the
							information as stated above. I have no objection in
							sharing my credentials to authorized third parties
							of Arzooo
						</span>
					</div>
					<div className="flex">
						<span>6.</span>
						<span>
							I agree and affirm that Arzooo may contact me and
							communicate with me over telephonic calls, or SMS on
							the mobile number provided, or through any other
							communication mode (“Communication Modes”) to verify
							the details provided by me. Further, I confirm that
							I would like to know through the above-mentioned
							Communication Modes various Arzooo credit offer
							schemes or loan promotional schemes or any other
							promotional schemes relating to various
							products/services offered by Arzooo/its group
							companies/business partners from time to time and
							hereby authorize Arzooo, its group companies,
							employees, agents, associates, business partners to
							contact me from time to time for the same.
						</span>
					</div>
					<div className="flex">
						<span>7.</span>
						<span>
							I hereby expressly consent and authorise Arzooo /
							its representatives/agents/ its business
							partners/its group companies/affiliates to send me
							any communication regarding products/services
							offered by them using various communication
							channels, such as, telephone,
							calls/SMS/bitly/bots/emails/post etc.
						</span>
					</div>
					<div className="flex">
						<span>8.</span>
						<span>
							I undertake to keep Arzooo updated of any change in
							the information provided by me within 30 days from
							the date of change. In case of any change in my
							business address or nature of business or business
							ownership or contact information like mobile number,
							email id etc, it is my responsibility to inform
							Arzooo on such changes within 30days from the date
							of change. Arzooo can file a legal suit against me
							if I fail to inform the same.
						</span>
					</div>
					<div className="flex">
						<span>9.</span>
						<span>
							I understand and acknowledge that Arzooo shall have
							the absolute discretion, without assigning any
							reason to reject my credit application and that
							Arzooo shall not be responsible/liable in any manner
							whatsoever for such rejection.
						</span>
					</div>
					<div className="flex">
						<span>10.</span>
						<span>
							I further understand and agree that pursuant to this
							application form, I will be required to submit
							documents to the satisfaction of Arzooo and accept
							the credit terms and conditions for availing the
							credit granted to me by Arzooo from time to time.
						</span>
					</div>
					<div className="flex">
						<span>11.</span>
						<span>
							Arzooo has rights to take legal action against me
							for any non-payment of dues or default.
						</span>
					</div>
					<div className="flex">
						<span>12.</span>
						<span>
							I hereby expressly consent and authorise Arzooo /
							its representatives/ agents/ its business partners/
							its group companies/ affiliates to initiate checks
							and verify data relating to my PAN, Aadhaar, GST,
							Bank transactions, other related documents and
							process my credit application.
						</span>
					</div>
					<div className="flex">
						<span>13.</span>
						<span>
							I have authenticated the registration process
							through OTP from my registered mobile number with
							Arzooo which is provided by me at the time of
							registration with Arzooo.
						</span>
					</div>
					<div className="flex">
						<span>14.</span>
						<span>
							I represent and warrant that I am the registered
							owner/licensed user of the brand/trademark in the
							Product and further, agree and undertake to permit
							Arzooo to use the brand, logo, trademark and
							tradename of the Product for marketing and
							promotional purposes.
						</span>
					</div>
					<div className="flex">
						<span>15.</span>
						<span>
							In case if any liability comes on Sterne because of
							the vendor, Vendor will compensate entirely.
						</span>
					</div>
					<div className="flex">
						<span>16.</span>
						<span>
							Vendor will comply with all taxation, statutory and
							regulatory compliance. In case any liability comes
							on Sterne because of Vendors non-compliance or
							Sterne has to incur any losses because of Vendor,
							Vendor will compensate the same entirely.
						</span>
					</div>
				</div>
			</div>
			<div className="mt-30 flex items-center justify-center">
				<div>
					<Checkbox
						name="terms"
						label="I have read and agree to the Terms and Conditions"
						labelClassName="text-10 leading-12"
						onChange={(e) => handleChange(e)}
						checked={checked}
					/>
					<div className="mt-24 flex justify-between">
						<Button
							onClick={() => router.back()}
							className="w-126 h-28 text-12 leading-18 tracking-0.12 text-blue-primary border border-blue-primary rounded-16"
						>
							Decline
						</Button>
						<Button
							onClick={submit}
							disabled={!checked}
							className="w-126 h-28 text-12 leading-18 tracking-0.12 rounded-16 bg-blue-primary text-white"
						>
							Accept
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistrationTerms;
