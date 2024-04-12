import React from 'react';
import { Button, Form, Input } from 'antd';
import fetchApi from 'api/fetchApi';
import { useNavigate } from 'react-router-dom';
import useAuth from 'components/Auth/useAuth';


const Register = () => {
	const navigate = useNavigate()
	const { onLogin } = useAuth()


	const onFinishFailed = (errorInfo) => {
		alert("Bir sorun oluştu sonra tekrar deneyiniz")
	};


	const onFinish = async (values) => {
		const response = await fetchApi('/api/auth/login', values)

		if (response && response.success) {
			onLogin(response.data)
			// navigate('/feed');
		}else {
			alert('Bir hata oluştu')
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
				rules={[
					{ required: true, message: 'Please enter your username!' },
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


			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Giriş yap
				</Button>
			</Form.Item>
		</Form>

	)
}

export default Register