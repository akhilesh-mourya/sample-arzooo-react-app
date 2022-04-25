import React, { FC, useRef, useEffect } from 'react';
import Portal from '@reach/portal';
import { motion, AnimatePresence } from 'framer-motion';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';

import { fadeInOut } from '@/helpers/motion/fade-in-out';
import { zoomOutIn } from '@/helpers/motion/zoom-out-in';
import { useUI } from '@/context/ui.context';
import useOnClickOutside from '@/hooks/useClickOutside.hook';

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
	center: 'p-0',
	bottom: 'p-5 pb-0',
};
const containerClasses = {
	center: 'h-auto max-h-full top-1/2 -translate-y-1/2',
	bottom: 'h-full max-h-70vh bottom-0',
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
	const { closeModal } = useUI();
	const modalRootRef = useRef() as DivElementRef;
	const modalInnerRef = useRef() as DivElementRef;
	useOnClickOutside(modalInnerRef, () => closeModal());

	useEffect(() => {
		if (modalInnerRef.current) {
			if (open) {
				disableBodyScroll(modalInnerRef.current);
			} else {
				enableBodyScroll(modalInnerRef.current);
			}
		}
		return () => {
			clearAllBodyScrollLocks();
		};
	}, [open]);

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
								<button
									onClick={onClose}
									aria-label="Close panel"
									className={cn(
										'absolute -right-30 z-10 inline-flex items-center justify-center text-24 text-white transition duration-200 focus:outline-none',
									)}
								>
									✕
								</button>
								<div
									ref={modalInnerRef}
									className="overflow-y-auto h-full rounded-lg"
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
