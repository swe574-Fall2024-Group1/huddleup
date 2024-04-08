import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import fetchApi from 'api/fetchApi';
import { useNavigate } from 'react-router-dom';
import useAuth from 'components/Auth/useAuth';


const Register = () => {
	const navigate = useNavigate()
	const { onLogin } = useAuth()

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		alert("Bir sorun oluştu sonra tekrar deneyiniz")
	};


	const onFinish = async (values) => {
		const response = await fetchApi('/api/auth/login', values)

		if (response && response.success) {
			onLogin(response.data)
			navigate('/dashboard/projects');
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
				label="Email"
				name="email"
				rules={[
					{ required: true, message: 'Lütfen mail adresinizi yazın!' },
					{ type: 'email', message: 'Geçerli bir mail adresi girin!' }
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Şifre"
				name="password"
				rules={[{ required: true, message: 'Lütfen şifrenizi girin!' },
				{ min: 10, message: 'Şifre minimum 10 karakterden oluşmalıdır.' },
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox>Beni hatırla</Checkbox>
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