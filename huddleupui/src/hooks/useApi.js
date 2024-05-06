import Cookies from "js-cookie";
import { useEffect, useState } from "react"

const useApi = async (url, payload) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)


  const fetchApi = async () => {
	const BASE_URL = 'https://huddleup.space:8000'

	try {
		const sessionToken = Cookies.get('hudSession')
		const session = {}

		if(sessionToken){
			session['x-dub-session-token'] = sessionToken
		}

		const response = await fetch(BASE_URL + url + '/', {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
			  "Content-Type": "application/json",
			  'x-dub-session-token': session['x-dub-session-token'] || ''
			},
			body: JSON.stringify(payload), // body data type must match "Content-Type" header
		});


		if (response.ok) {
		  // Successful response, handle it here
			const json = await response.json()

			setData(json)
			setLoading(false)
			return json
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