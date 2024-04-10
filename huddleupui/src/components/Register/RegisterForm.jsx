import React from 'react';
import { Button, Form, Input} from 'antd';
import fetchApi from 'api/fetchApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate()

	const onFinishFailed = (errorInfo) => {
		alert("Bir sorun oluştu sonra tekrar deneyiniz")
	};


	const onFinish = async (values) => {
		const response = await fetchApi('/api/auth/register', values)

		if (response && response.success) {
			navigate('/login');
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
			<Form.Item
				label="Username"
				name="username"
				rules={[{ required: true, message: 'Please eneter username!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please enter password!' },
				{ min: 10, message: 'Min 10 characters.' },
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>

	)
}

export default Register