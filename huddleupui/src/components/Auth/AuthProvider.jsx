import { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import fetchApi from "api/fetchApi";


const getUserInfo = async (userId) => {
	const response = await fetchApi('/api/auth/get-user-info', { userId })
	const data = await response.json()
	return data
}


const AuthProvider = ({ children }) => {
	const initialSessionCookie = Cookies.get('dubSession')
	let initialSessionToken

	if (initialSessionCookie) {
		const decryptedSession = CryptoJS.AES.decrypt(
			initialSessionCookie,
			'supersecret'
		).toString(CryptoJS.enc.Utf8);
		const sessionData = JSON.parse(decryptedSession)
		initialSessionToken = sessionData.session
	}
	const [token, setToken] = useState(initialSessionToken);
	const [userInfo, setUserInfo] = useState(null)

	const handleLogin = async () => {
		const sessionCookie = Cookies.get('dubSession')
		if (sessionCookie) {
			const decryptedSession = CryptoJS.AES.decrypt(
				sessionCookie,
				'supersecret'
			).toString(CryptoJS.enc.Utf8);
			const sessionData = JSON.parse(decryptedSession)
			setToken(sessionData.session)
		}
	};

	const handleLogout = () => {
		setToken(null);
		Cookies.remove('dubSession')
	};

	useEffect(() => {
		const getUserInfo = async (userId) => {

			if(userId){
				const response = await fetchApi('/api/auth/get-user-info', {})
				if(response && response.success){
					setUserInfo(response.data.user)
				}
			}
		}

		getUserInfo(token?.userId)
	}, [token])

	const value = {
		token,
		userInfo,
		onLogin: handleLogin,
		onLogout: handleLogout,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;