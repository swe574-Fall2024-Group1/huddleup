import React from 'react';
import { Button, Form, Input} from 'antd';
import fetchApi from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate()

	const onFinishFailed = (errorInfo) => {
		alert("An error occurred. Please check the form and try again.")
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

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}  style={{textAlign: 'center'}}>
				<Button size='large' style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white' }} htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>

	)
}

export default Register