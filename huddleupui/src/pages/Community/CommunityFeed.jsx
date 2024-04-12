import { Form, Input, Button, Switch, message } from 'antd';
import { useState } from 'react';
import fetchApi from 'api/fetchApi';
import { useNavigate } from 'react-router-dom';


const { TextArea } = Input;

export default function CommunityForm() {
	const [communityImageBase64, setCommunityImageBase64] = useState(null);
	const navigate = useNavigate()
	

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setCommunityImageBase64(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const onFinish = async (values) => {
		const payload = { ...values, mainImage: communityImageBase64 || '' };

		try {
			const response = await fetchApi('/api/communities/create-community', payload)

			if (response.success) {
				message.success('Community created successfully!')

				const { id } = response.data

				navigate(`/community/${id}`)
			}
		} catch (error) {
			console.error('Error creating community:', error);
			message.error('Error creating community. Please try again later.');
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Form submission failed:', errorInfo);
		message.error('Please fill in all required fields!');
	};

	return (
		<div>
		
		</div>
	);
}