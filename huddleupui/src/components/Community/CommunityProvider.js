import { useEffect, useState } from "react";
import CommunityContext from "../../contexts/CommunityContext";
import fetchApi from "../../api/fetchApi";
import { useParams } from 'react-router-dom';



const CommunityProvider = ({ children }) => {
	const [communityInfo, setCommunityInfo] = useState({})

	const { communityId } = useParams();

	const handleJoin = async (data) => {

	};

	const handleLeave = () => {

	};

	useEffect(() => {

		if (communityId) {
			const payload = {
				communityId
			}

			fetchApi(`/api/communities/get-community-info`, payload)
				.then((response) => {
					if (response.success) {
						setCommunityInfo(response.data);
					}
				})
				.catch((error) => {
					console.error("Error fetching community info", error);
				});


		}
	}, [])

	const value = {
		communityInfo: communityInfo || {},
	};

	return (
		<CommunityContext.Provider value={value}>
			{children}
		</CommunityContext.Provider>
	);
};

export default CommunityProvider;