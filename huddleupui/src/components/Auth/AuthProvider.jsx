import { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import fetchApi from "../../api/fetchApi";
import axios from "axios";


const AuthProvider = ({ children }) => {
	const initialSessionCookie = Cookies.get('hudSession')
	let initialSessionToken

	if (initialSessionCookie) {
		initialSessionToken = initialSessionCookie
	}

	const [token, setToken] = useState(initialSessionToken);
	const [userInfo, setUserInfo] = useState(null)

	const handleLogin = async (data) => {
		if (data.sessionToken) {
			setToken(data.sessionToken);
			Cookies.set('hudSession', data.sessionToken)
			axios.defaults.headers.common['x-dub-session-token'] = data.sessionToken;
            axios.defaults.headers.post['Content-Type'] = 'application/json';
		}
	};

	const handleLogout = () => {
		setToken(null);
		Cookies.remove('hudSession')
	};

	useEffect(() => {
		const getUserInfo = async () => {
			const response = await fetchApi('/api/auth/get-user-info', {})
			if (response && response.success) {
				setUserInfo(response.data)
			}
		}

		getUserInfo()
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