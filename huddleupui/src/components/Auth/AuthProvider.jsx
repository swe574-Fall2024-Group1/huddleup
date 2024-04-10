import { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import fetchApi from "api/fetchApi";


const AuthProvider = ({ children }) => {
	const initialSessionCookie = Cookies.get('hudSession')
	let initialSessionToken

	if (initialSessionCookie) {
		initialSessionToken = initialSessionCookie
	}

	const [token, setToken] = useState(initialSessionToken);
	const [userInfo, setUserInfo] = useState(null)

	const handleLogin = async (data) => {
		console.log(data)
		if (data.sessionToken) {
			setToken(data.sessionToken);
			Cookies.set('hudSession', data.sessionToken)
		}
	};

	const handleLogout = () => {
		setToken(null);
		Cookies.remove('hudSession')
	};

	useEffect(() => {
		console.log('heree')
		const getUserInfo = async (userId) => {
			console.log('daf')
			if(userId){
				const response = await fetchApi('/api/auth/get-user-info', {})
				console.log(response)
				if(response && response.success){
					setUserInfo(response.data.user)
				}
			}
		}

		getUserInfo('dfsdfds')
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