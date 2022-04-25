/**
 * Ths context is used for authentication for the app.
 * and also gives you data weather you are logged in or not
 *
 * Author: Vakadu Vinod
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Spinner from '@/components/atoms/spinner.atom';
import Authorize from '@/components/atoms/authorize.atom';

type AuthContextData = {
	isAuthorized: boolean;
	session?: CommonTypes.LoginDataType;
	loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	const [session, setSession] = useState<any>();
	const [loading, setLoading] = useState(true);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		loadStorageData();
	}, []);

	async function loadStorageData(): Promise<void> {
		try {
			const authDataSerialized = localStorage.getItem('token') as any;
			if (authDataSerialized) {
				const _authData = jwtDecode<JwtPayload>(authDataSerialized);
				setSession(_authData);
				setIsAuthorized(true);
			} else {
				setIsAuthorized(false);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return <Spinner />;
	}

	if (!isAuthorized) {
		return <Authorize />;
	}

	return (
		<AuthContext.Provider value={{ session, loading, isAuthorized }}>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthContext, AuthProvider, useAuth };
