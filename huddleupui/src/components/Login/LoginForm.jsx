import React from 'react';
import { Button, Form, Input, message } from 'antd';
import fetchApi from '../../api/fetchApi';
import useAuth from '../Auth/useAuth';


const Login = () => {
	const { onLogin } = useAuth()

	const onFinishFailed = (errorInfo) => {
		message.error("An error occurred. Please check the form and try again.")
	};


	const onFinish = async (values) => {
		const response = await fetchApi('/api/auth/login', values)

		if (response && response.success) {
			message.success("Login successful.")
			onLogin(response.data)
			// navigate('/feed');
		} else {
			message.error("An error occurred. Please check the form and try again.")
		}
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			{/* Check no whitespace in username */}
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{ required: true, message: 'Please enter your username!' }
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please enter your passsword!' },
				{ min: 10, message: 'Min 10 characters.' },
				]}
			>
				<Input.Password />
			</Form.Item>


			<Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'center' }}>
				<Button size='large' style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white' }} htmlType="submit">
					Login
				</Button>
			</Form.Item>
		</Form>

	)
}

export default Login