/**
 * All the token methods
 *
 * Author: Vakadu Vinod
 */

// getting access token
export function getAccessToken() {
	const accessToken = localStorage.getItem('token');
	return accessToken;
}

// getting refresh token
export function getRefreshToken() {
	const refreshToken = localStorage.getItem('refreshToken');
	return refreshToken;
}

// updating the access token
export function updateAccessToken(token) {
	let accessTok = localStorage.getItem('token');
	accessTok = token;
	localStorage.setItem('token', accessTok);
}
