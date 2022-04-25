import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';

import Button from './button.atom';

export default function DialogBox(props: {
	isOpen: boolean;
	onChange: any;
	title: string;
	desc?: any;
	btnText?: string;
	submit?: any;
	cancelBtn?: any;
	showButtons?: boolean;
}) {
	return (
		<Transition appear show={props.isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={props.onChange}
			>
				<div className="min-h-screen px-16 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-md rounded-6 px-12 py-20 overflow-hidden align-middle transition-all transform bg-white">
							<div className="flex justify-between items-center flex-row">
								<Dialog.Title
									as="h3"
									className="text-16 text-left leading-21 px-10 font-bold"
								>
									{props.title}
								</Dialog.Title>
								<div
									className="flex justify-between items-center flex-row"
									onClick={props.cancelBtn}
								>
									<XIcon
										className="w-24 h-24"
										aria-hidden="true"
									/>
								</div>
							</div>
							<div className="mt-2 text-left">{props.desc}</div>
							{props.showButtons && (
								<div className="flex">
									<Button
										className="text-14 leading-18 font-semibold w-full mt-12 rounded-6 py-12 text-black uppercase"
										onClick={props.cancelBtn}
									>
										cancel
									</Button>
									<Button
										className="bg-blue-primary text-14 leading-18 font-semibold w-full mt-12 rounded-6 py-12 text-white uppercase"
										onClick={props.submit}
									>
										{props.btnText}
									</Button>
								</div>
							)}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
