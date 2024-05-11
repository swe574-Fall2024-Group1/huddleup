import React from 'react';
import { Form, Input, Button, Select, Checkbox, Row, Col, message, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import fetchApi from '../../api/fetchApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddTemplate() {
	const [form] = Form.useForm();
	const navigate = useNavigate()

	const { communityId } = useParams();


	const typeOptions = [
		{ key: "string", value: "Text" },
		{ key: "normalizedString", value: "Single-space Text" },
		{ key: "token", value: "Compact Text" },
		{ key: "byte", value: "Small Number (-128 to 127)" },
		{ key: "unsignedByte", value: "Small Positive Number (0 to 255)" },
		{ key: "hex64Binary", value: "Base 64 Code" },
		{ key: "hexBinary", value: "Hexadecimal Code" },
		{ key: "integer", value: "Whole Number" },
		{ key: "positiveInteger", value: "Positive Whole Number" },
		{ key: "negativeInteger", value: "Negative Whole Number" },
		{ key: "nonNegativeInteger", value: "Zero or Positive Number" },
		{ key: "nonPositiveInteger", value: "Zero or Negative Number" },
		{ key: "int", value: "Large Number" },
		{ key: "unsignedInt", value: "Large Positive Number" },
		{ key: "long", value: "Very Large Number" },
		{ key: "unsignedLong", value: "Very Large Positive Number" },
		{ key: "short", value: "Medium Number" },
		{ key: "unsignedShort", value: "Medium Positive Number" },
		{ key: "decimal", value: "Decimal Number" },
		{ key: "float", value: "Floating Point Number" },
		{ key: "double", value: "Precise Floating Point Number" },
		{ key: "Boolean", value: "True/False Value" },
		{ key: "time", value: "Time of Day (HH:MM:SS)" },
		{ key: "date", value: "Calendar Date (YYYY-MM-DD)" },
		{ key: "dateTime", value: "Date and Time (YYYY-MM-DD HH:MM:SS)" },
		{ key: "duration", value: "Time Duration" },
		{ key: "gMonth", value: "Month of the Year" },
		{ key: "gYear", value: "Year" },
		{ key: "gYearMonth", value: "Year and Month" },
		{ key: "gDay", value: "Day of the Month" },
		{ key: "gMonthDay", value: "Specific Date (MM-DD)" },
		{ key: "Name", value: "Identifier Name" },
		{ key: "QName", value: "Qualified Identifier Name" },
		{ key: "NCName", value: "Local Identifier Name" },
		{ key: "anyURI", value: "Web Address (URL or URN)" },
		{ key: "language", value: "Language Code" },
		{ key: "image", value: "Image File" },
		{ key: "geolocation", value: "Geographic Location" },
	];

	const onFinish = async (values) => {
		const payload = { ...values, communityId };

		try {
			const response = await fetchApi('/api/communities/templates/create-template', payload)

			if (response.success) {
				message.success('Template created successfully!')

				navigate(`/communities/${communityId}`)
			}
		} catch (error) {
			console.error('Error creating template:', error);
			message.error('Error creating template. Please try again later.');
		}
	};

	return (
		<div>
			<h2 style={{ color: '#5c5b5b' }}>
				Creating new template
			</h2>

			<Card>
				<Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
					<Form.Item
						name="templateName"
						label="Template Name"
						rules={[{ required: true, message: 'Missing template name' }]}
					>
						<Input placeholder="Enter template name" />
					</Form.Item>

					<Form.List
						name="rows"
						initialValue={[{ title: '', type: typeOptions[0].key, required: false }]}
					>
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, fieldKey }, index) => (
									<Row key={key} gutter={16} align="middle">
										<Col span={2}>
											<div style={{ textAlign: 'center', padding: '6px 0' }}>{index + 1}</div>
										</Col>
										<Col span={6}>
											<Form.Item
												{...fieldKey}
												name={[name, 'title']}
												rules={[{ required: true, message: 'Missing title' }]}
											>
												<Input placeholder="Title" />
											</Form.Item>
										</Col>
										<Col span={10}>
											<Form.Item
												{...fieldKey}
												name={[name, 'type']}
												rules={[{ required: true, message: 'Missing type' }]}
											>
												<Select placeholder="Select a type" style={{ width: '100%' }} >
													{typeOptions.map(option => (
														<Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
													))}
												</Select>
											</Form.Item>
										</Col>
										<Col span={4}>
											<Form.Item
												valuePropName="checked"
												{...fieldKey}
												name={[name, 'required']}
											>
												<Checkbox>Required</Checkbox>
											</Form.Item>
										</Col>
										<Col span={2}>
											{fields.length > 1 ? (
												<Button type="danger" onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
											) : null}
										</Col>
									</Row>
								))}
								<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
									Add Data Row
								</Button>
							</>
						)}
					</Form.List>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Create
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>

	);
}
