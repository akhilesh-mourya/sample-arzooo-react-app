import React, { FC, useRef } from 'react';
import Portal from '@reach/portal';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import { fadeInOut } from '@/helpers/motion/fade-in-out';
import { zoomOutIn } from '@/helpers/motion/zoom-out-in';

type ModalProps = {
	open?: boolean;
	children?: React.ReactNode;
	onClose?: () => void;
	rootClassName?: string;
	useBlurBackdrop?: boolean;
	containerClassName?: string;
	variant?: 'center' | 'bottom';
};
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const rootClasses = {
	center: 'p-4 md:p-5',
	bottom: 'p-5 pb-0',
};
const containerClasses = {
	center: 'h-auto max-h-full top-1/2 -translate-y-1/2 rounded-lg',
	bottom: 'h-full max-h-70vh bottom-0 rounded-ts-2xl rounded-te-2xl',
};

const Modal: FC<ModalProps> = ({
	children,
	open,
	onClose,
	rootClassName,
	useBlurBackdrop,
	containerClassName,
	variant = 'center',
}) => {
	const modalRootRef = useRef() as DivElementRef;
	const modalInnerRef = useRef() as DivElementRef;

	return (
		<Portal>
			<AnimatePresence>
				{open && (
					<motion.div
						ref={modalRootRef}
						key="modal"
						initial="from"
						animate="to"
						exit="from"
						variants={fadeInOut(0.25)}
						className={cn(
							'modal-root fixed bg-overlay-bg bg-opacity-70 inset-0 z-50',
							useBlurBackdrop &&
								'backdrop-filter backdrop-blur-sm',
							rootClasses[variant],
							rootClassName,
						)}
					>
						<motion.div
							initial="from"
							animate="to"
							exit="from"
							variants={zoomOutIn()}
							className="relative h-full mx-auto w-full"
						>
							<div
								className={cn(
									'w-full md:w-auto absolute left-1/2 transform -translate-x-1/2',
									containerClasses[variant],
									containerClassName,
								)}
							>
								<div
									ref={modalInnerRef}
									className="overflow-y-auto h-full rounded-lg"
									style={{ maxHeight: 'calc(100vh - 140px)' }}
								>
									{children}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</Portal>
	);
};

export default Modal;
