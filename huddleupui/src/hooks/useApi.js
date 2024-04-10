// useApi.js
import uuid4 from "uuid4";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react"

const useApi = async (url, payload) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const BASE_URL = 'http://localhost:4000'

  const fetchApi = async () => {
	try {
		const id = uuid4();
		const sessionCookie = Cookies.get('hudSession')
		const session = {}
		if(sessionCookie){
			const decryptedSession = CryptoJS.AES.decrypt(
				sessionCookie,
				'supersecret'
			  ).toString(CryptoJS.enc.Utf8);
			const sessionData = JSON.parse(decryptedSession)
			session['x-dub-session-id'] = sessionData.session.sessionId
			session['x-dub-session-user-id'] = sessionData.session.userId
		}

		const response = await fetch(BASE_URL + url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
			  "Content-Type": "application/json",
			  'x-dub-request-id': id,
			  'x-dub-session-id': session['x-dub-session-id'],
			  'x-dub-session-user-id': session['x-dub-session-user-id']
			},
			body: JSON.stringify(payload), // body data type must match "Content-Type" header
		});


		if (response.ok) {
		  // Successful response, handle it here
			const json = await response.json()
			setLoading(false)
			setData(json.data)
		} else {
		  // Handle non-OK responses here
		  console.error('Request failed with status:', response.status);
		}
	  } catch (error) {
		// Handle fetch errors here
		console.error('Fetch error:', error);
	  }

  }

  useEffect(() => {
	fetchApi();
  }, []);

  return { loading, data }
};

export default useApi;