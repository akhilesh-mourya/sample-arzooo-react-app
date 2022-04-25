/**
 * UpdateStatus Component
 * @param text            text to show
 * @param className       classes for the component
 *
 * Author: Vakadu Vinod
 */

import React from 'react';

const UpdateStatus = (props: { text: string; className: string }) => {
	return <div className={props.className}>{props.text}</div>;
};

export default UpdateStatus;
