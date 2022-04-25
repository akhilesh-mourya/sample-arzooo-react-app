import jwtDecode from 'jwt-decode';

export default function parseJwtToken() {
	let token = localStorage.getItem('token');
	return jwtDecode(token);
}
