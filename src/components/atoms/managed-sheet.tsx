/**
 * Bottom sheet Component
 * this component is used for showing bootom sheet
 * all the bottom sheets are being used here
 *
 * Author: Vakadu Vinod
 */

import React, { useMemo } from 'react';
import Sheet from 'react-modal-sheet';
import dynamic from 'next/dynamic';

import { useUI } from '@/context/ui.context';
import { CONSTANTS } from '@/helpers/persistent.helpers';

const RegistrationInfo = dynamic(
	() => import('@/molecules/sheets/registration-info.molecule'),
);
const SortFilter = dynamic(
	() => import('@/molecules/sheets/sort-filter.molecule'),
);
const CategoryFilter = dynamic(
	() => import('@/molecules/sheets/category-filter.molecule'),
);
const UPISheet = dynamic(() => import('@/molecules/sheets/upi-sheet.molecule'));
const PPaySheet = dynamic(
	() => import('@/molecules/sheets/ppay-sheet.molecule'),
);
const PodSheet = dynamic(() => import('@/molecules/sheets/pod-sheet.molecule'));

const ManagedSheet: React.FC = () => {
	const { displaySheet, closeSheet, sheetView } = useUI();
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
			isOpen={displaySheet}
			onClose={closeSheet}
			disableDrag={true}
			snapPoints={[0]}
		>
			<Sheet.Container style={styles}>
				<Sheet.Content>
					{sheetView === CONSTANTS.REGISTRATION_INFO && (
						<RegistrationInfo />
					)}
					{sheetView === CONSTANTS.SORT_FILTER && <SortFilter />}
					{sheetView === CONSTANTS.CATEGORY_FILTER && (
						<CategoryFilter />
					)}
					{sheetView === CONSTANTS.UPI_SHEET && <UPISheet />}
					{sheetView === CONSTANTS.PPAY_SHEET && <PPaySheet />}
					{sheetView === CONSTANTS.POD_SHEET && <PodSheet />}
				</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop />
		</Sheet>
	);
};

export default ManagedSheet;
