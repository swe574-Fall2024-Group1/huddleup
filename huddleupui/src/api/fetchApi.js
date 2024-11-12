import Cookies from "js-cookie";



const fetchApi = async (url, payload, method = 'POST') => {

	try {
		const sessionToken = Cookies.get('hudSession')
		const session = {}

		if(sessionToken){
			session['x-dub-session-token'] = sessionToken
		}

		const fetchOptions = {
			method: method, // *GET, POST, PUT, DELETE, etc.
			headers: {
			  "Content-Type": "application/json",
			  'x-dub-session-token': session['x-dub-session-token'] || ''
			},
		}
		if(method !== 'GET'){
			fetchOptions.body = JSON.stringify(payload)
		} else if (method === 'GET' && payload){
			url = url + '?' + new URLSearchParams(payload).toString()
		}

		const response = await fetch( url + '/', fetchOptions);




		if (response.ok) {
		  // Successful response, handle it here
			const json = await response.json()

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

export default fetchApi