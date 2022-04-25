/**
 * firebase analytcs lgging events
 * @param event       this is the name of the event
 * @param params      other params for the event
 *
 * Author: Vakadu Vinod
 */

import { logEvent } from 'firebase/analytics';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { analytics } from './firebase';

export async function eventLog(event: string, params: any) {
	const authDataSerialized = (await localStorage.getItem('token')) as string;
	let _authData = (await jwtDecode<JwtPayload>(
		authDataSerialized,
	)) as CommonTypes.LoginDataType;
	let event_params = {
		...params,
		username: _authData.username ? _authData.username : '', //adding username to all events
		clicked_on: new Date(),
	};
	logEvent(analytics, event, event_params);
}
