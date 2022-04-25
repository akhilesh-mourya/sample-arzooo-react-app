import React from 'react';

import styles from './styles.module.scss';

interface CopyToClipboardProps {
	show: boolean;
	msg: string;
}

const defaultProps: CopyToClipboardProps = {
	show: false,
	msg: '',
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ show, msg }) => {
	const copyText = () => {
		const copyText = document.getElementById('myInput') as HTMLInputElement;
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand('copy');
		const tooltip = document.getElementById('myTooltip');
		tooltip.innerHTML = 'Copied';
	};

	const mouseOut = () => {
		const tooltip = document.getElementById('myTooltip');
		tooltip.innerHTML = 'Copy to clipboard';
	};

	return (
		<div
			className={
				show
					? 'text-center m-5 bg-grey-light rounded-8 p-6  flex justify-evenly items-center'
					: 'hidden'
			}
		>
			<img src="/images/pin.svg" alt={'pin'} />
			<input type="text" value={msg} id="myInput" onChange={() => null} />
			<div className="relative inline-block clipboard-tooltip">
				<div
					onClick={copyText}
					onMouseOut={mouseOut}
					className="font-semibold text-12 pl-10"
				>
					<span className="tooltip-copied" id="myTooltip">
						Copied
					</span>
					Copy
				</div>
			</div>
		</div>
	);
};

CopyToClipboard.defaultProps = defaultProps;

export default CopyToClipboard;
