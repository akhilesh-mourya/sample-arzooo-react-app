/**
 * Modal Component
 * @param open                    waeather to show modal or not
 * @param children                inside the modal
 * @param onClose                 on closing the modal
 * @param rootClassName           classes for modal
 * @param useBlurBackdrop         showing backdrop
 * @param containerClassName      caontainer classes for modal
 * @param variant                 weaTHER TO SHOW modal in cernter or bottom
 *
 * Author: Vakadu Vinod
 */

import React, { FC, useRef, useEffect } from 'react';
import Portal from '@reach/portal';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import cn from 'classnames';

import { useUI } from '@/context/ui.context';
import useOnClickOutside from '@/hooks/useClickOutside.hook';

type ModalProps = {
	open?: boolean;
	children?: React.ReactNode;
	onClose?: () => void;
	rootClassName?: string;
	useBlurBackdrop?: boolean;
	containerClassName?: string;
	variant?: 'center' | 'bottom' | 'full';
};
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

// variant based classes for modal root, container & close btn
const rootClasses = {
	center: 'p-4 md:p-5',
	bottom: 'p-5 pb-0',
};
const containerClasses = {
	center: 'h-auto max-h-full top-1/2 -translate-y-1/2',
	bottom: 'h-full max-h-70vh bottom-0',
	full: 'h-full',
};
const closeBtnClasses = {
	center: 'top-4 end-4',
	bottom: 'top-1/4 start-1/2 transform -translate-y-1/2 -translate-x-1/2',
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
			{open && (
				<div
					className={cn(
						'modal-root fixed bg-black bg-opacity-70 inset-0 z-50',
						useBlurBackdrop && 'backdrop-filter backdrop-blur-sm',
						rootClasses[variant],
						rootClassName,
					)}
				>
					<div className="relative h-full mx-auto w-full">
						<div
							className={cn(
								'w-full md:w-auto absolute left-1/2 transform -translate-x-1/2 shadow-xl',
								containerClasses[variant],
								containerClassName,
							)}
						>
							{/* <button
                                onClick={onClose}
                                aria-label="Close panel"
                                className={cn(
                                    "z-10 absolute right-20 top-20",
                                    closeBtnClasses[variant]
                                )}
                            >
                                <ImageFile
                                    src='Close.svg'
                                    width={ 14 }
                                    height={ 14 }
                                />
                            </button> */}
							<div
								ref={modalInnerRef}
								className="overflow-y-auto h-full rounded-20"
								style={{ maxHeight: 'calc(100vh - 140px)' }}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			)}
		</Portal>
	);
};

export default Modal;
