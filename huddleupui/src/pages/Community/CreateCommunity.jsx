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
		const payload = {...values, mainImage: communityImageBase64 || ''};

		try {
			const response = await fetchApi('/api/communities/create-community', payload)

			if(response.success){
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
		<Form
			name="community_form"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			layout="vertical"
		>
			{/* Form fields */}
			<Form.Item
				label="Name of the community"
				name="name"
				rules={[{ required: true, message: 'Please input the name of the community!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Describe the community"
				name="description"
				rules={[{ required: true, message: 'Please describe the community!' }]}
			>
				<TextArea rows={4} />
			</Form.Item>

			<Form.Item
				label="Make this community private"
				name="isPrivate"
				valuePropName="checked"
			>
				<Switch />
			</Form.Item>

			<Form.Item
				label="Community image"
				name="mainImage"
				rules={[{ required: true, message: 'Please upload a community image!' }]}
			>
				<input type="file" accept="image/*" onChange={handleImageChange} />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">Create community</Button>
			</Form.Item>
		</Form>
	);
}