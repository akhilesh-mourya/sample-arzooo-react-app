/**
 * Layout for the whole app
 */

import React from 'react';
import cn from 'classnames';

import Header from './header.layout';

interface Props {
	children: any;
	webBack?: boolean;
	title?: string;
	classNames?: string;
	showHeader?: boolean;
	showShare?: boolean;
	showCart?: boolean;
	headerBackground?: string;
	style?: any;
}

const Layout: React.FC<Props> = ({
	children,
	webBack = true,
	title,
	classNames,
	showHeader = true,
	showShare = false,
	showCart = false,
	headerBackground,
	style,
}) => {
	return (
		<div className="flex flex-col min-h-screen">
			{showHeader ? (
				<Header
					showShare={showShare}
					showBack={true}
					webBack={webBack}
					title={title}
					showCart={showCart}
					headerBackground={headerBackground}
				/>
			) : null}
			<main
				className={cn(
					'relative flex-grow mt-56 bg-grey-bg',
					classNames,
				)}
				style={{
					minHeight: '-webkit-fill-available',
					WebkitOverflowScrolling: 'touch',
					...style,
				}}
			>
				{children}
			</main>
		</div>
	);
};

export default Layout;
