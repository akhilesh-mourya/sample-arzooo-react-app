/**
 * Bottom sheet Component
 * @param show               weather to show bottom sheet or not
 * @param onClose            close the sheet
 * @param children           children for sheet
 *
 * Author: Vakadu Vinod
 */

import React, { memo, ReactNode, useMemo } from 'react';
import Sheet from 'react-modal-sheet';

interface Props {
	show: boolean;
	onClose: any;
	children: ReactNode;
}

const BottomSheet: React.FC<Props> = ({ show, onClose, children }) => {
	const styles = useMemo(() => {
		return {
			height: 'auto',
			maxHeight: '85%',
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
		};
	}, []);

	return (
		<Sheet
			isOpen={show}
			onClose={onClose}
			disableDrag={true}
			snapPoints={[0]}
		>
			<Sheet.Container style={styles}>
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	);
};

export default memo(BottomSheet);
