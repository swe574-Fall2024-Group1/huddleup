import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import useApi from 'hooks/useApi';
import fetchApi from 'api/fetchApi';
import { useNavigate } from 'react-router-dom';



const Register = () => {
	const navigate = useNavigate()

	const { Option } = Select;

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		alert("Bir sorun oluştu sonra tekrar deneyiniz")
	};


	const onFinish = async (values) => {
		const response = await fetchApi('/api/auth/register', values)

		if (response && response.success) {
			navigate('/login');
		}
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select style={{ width: 70 }} defaultValue="90" disabled>
				<Option value="90">+90</Option>
			</Select>
		</Form.Item>
	);


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
				label="Ad Soyad"
				name="name"
				rules={[{ required: true, message: 'Lütfen ad soyadınızı yazın!' }]}
			>
				<Input />
			</Form.Item>

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
				name="phone"
				label="Telefon numarası"
				rules={
					[{ required: true, message: 'Lütfen telefon numaranızı giriniz!', pattern: new RegExp(/^\d{10}$/) },
					]}
			>
				<Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Kaydet
				</Button>
			</Form.Item>
		</Form>

	)
}

export default Register