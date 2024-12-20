/* global BigInt */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import fetchApi from '../../api/fetchApi';
import { LoadingOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import Post from '../../components/Community/Post';
import CreateBadge from '../../pages/Community/CreateBadge.jsx';
import useCommunity from '../../components/Community/useCommunity';
import { Button, Card, Spin, Input, InputNumber, DatePicker, Select, Form, Checkbox, Grid } from 'antd';

const { useBreakpoint } = Grid;

export default function CommunityFeed() {
	const screens = useBreakpoint();
	const { communityInfo } = useCommunity();
	const navigate = useNavigate()
	const [posts, setPosts] = useState([]);
	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState({});
	const [searchOpen, setSearchOpen] = useState(false);
	const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
	const [postsLoading, setPostsLoading] = useState(true);
	const [form] = Form.useForm();

	const { communityId } = useParams();

	const posts_result = useApi('/api/communities/get-community-posts', { communityId });
	  const [badges, setBadges] = useState([]);

	  useEffect(() => {
		const fetchBadges = async () => {
		  const response = await fetchApi('/api/communities/badges/get-badges', {communityId: communityId}, 'GET');
		  if (response.success) {
			setBadges(response.data);
		  }
		};

		fetchBadges();
	  }, []);
	posts_result.then((response) => {
		if (response && !response.loading && postsLoading && posts.length === 0) {
			setPosts(response.data.data)
			setPostsLoading(false)
		}
	})

	const templates_result = useApi('/api/communities/templates/get-templates', { communityId });

	templates_result.then((response) => {
		if (response && !response.loading && templates.length === 0) {
			setTemplates(response.data.data)
		}
	})

	const handleTemplateChange = (value) => {
		const template = templates.find(t => t.id === value);
		setSelectedTemplate(template)
	};

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

	const renderAdvancedSearchFormRows = (rows) => {
		if (rows.length > 0) {
			return rows.map((row, index) => {
				const commonRules = [];

				const selectedType = typeOptions.find(option => option.key === row.type);
				const labelValue = selectedType ? selectedType.value : row.type;

				switch (row.type) {
					case 'string':
					case 'normalizedString':
					case 'token':
					case 'Name':
					case 'QName':
					case 'NCName':
					case 'anyURI':
						return (
							<Form.Item
								key={index}
								name={row.title.toLowerCase()}
								label={`${row.title} (${labelValue})`}
								rules={commonRules}
							>
								<Input placeholder={`Search by ${row.title.toLowerCase()}`} />
							</Form.Item>
						);

					case 'hex64Binary':
					case 'hexBinary':
						return (
							<Form.Item
								key={index}
								name={row.title.toLowerCase()}
								label={`${row.title} (${labelValue})`}
								rules={commonRules}
							>
								<Input placeholder={`Search by ${row.title.toLowerCase()}`} />
							</Form.Item>
						);

					case 'integer':
					case 'byte':
					case 'short':
					case 'int':
					case 'long':
					case 'unsignedByte':
					case 'unsignedShort':
					case 'unsignedInt':
					case 'unsignedLong':
					case 'positiveInteger':
					case 'nonNegativeInteger':
					case 'negativeInteger':
					case 'nonPositiveInteger':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<Form.Item name={`${row.title.toLowerCase()}_min`} style={{ width: '45%' }}>
										<Input placeholder={`Start ${row.type.toLowerCase()}`} />
									</Form.Item>
									<Form.Item name={`${row.title.toLowerCase()}_max`} style={{ width: '45%' }}>
										<Input placeholder={`End ${row.type.toLowerCase()}`} />
									</Form.Item>
								</Input.Group>
							</Form.Item>
						);
					case 'float':
					case 'double':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<Form.Item name={`${row.title.toLowerCase()}_min`} style={{ width: '45%' }}>
										<Input placeholder={`Start ${row.type.toLowerCase()}`} />
									</Form.Item>
									<Form.Item name={`${row.title.toLowerCase()}_max`} style={{ width: '45%' }}>
										<Input placeholder={`End ${row.type.toLowerCase()}`} />
									</Form.Item>
								</Input.Group>
							</Form.Item>
						);

					case 'Boolean':
						return (
							<Form.Item
								key={index}
								name={row.title.toLowerCase()}
								label={`${row.title} (${labelValue})`}
								valuePropName="checked"
								rules={commonRules}
							>
								<Checkbox>Yes</Checkbox>
							</Form.Item>
						);

					case 'time':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<Form.Item name={`${row.title.toLowerCase()}_min`} style={{ width: '45%' }}>
										<Input placeholder={`Start ${row.type.toLowerCase()}`} />
									</Form.Item>
									<Form.Item name={`${row.title.toLowerCase()}_max`} style={{ width: '45%' }}>
										<Input placeholder={`End ${row.type.toLowerCase()}`} />
									</Form.Item>
								</Input.Group>
							</Form.Item>
						);

					case 'date':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<DatePicker
										name={`${row.title.toLowerCase()}_min`}
										style={{ width: '45%' }}
										placeholder="Start Date"
									/>
									<DatePicker
										name={`${row.title.toLowerCase()}_max`}
										style={{ width: '45%' }}
										placeholder="End Date"
									/>
								</Input.Group>
							</Form.Item>
						);

					case 'dateTime':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<DatePicker
										showTime
										style={{ width: '45%' }}
										format="YYYY-MM-DD HH:mm:ss"
										placeholder="Start Date Time"
										name={`${row.title.toLowerCase()}_min`}
									/>
									<DatePicker
										name={`${row.title.toLowerCase()}_max`}
										showTime
										style={{ width: '45%' }}
										format="YYYY-MM-DD HH:mm:ss"
										placeholder="End Date Time"
									/>
								</Input.Group>
							</Form.Item>
						);

					case 'duration':
						return (
							<Form.Item
								key={index}
								name={row.title.toLowerCase()}
								label={`${row.title} (${labelValue})`}
								rules={[
									{
										pattern: /^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/,
										message: 'Please input a valid duration!'
									},
									...commonRules,
								]}
							>
								<Input placeholder={`Search by ${row.title.toLowerCase()}`} />
							</Form.Item>
						);

					case 'gYear':
					case 'gMonth':
					case 'gDay':
					case 'gYearMonth':
					case 'gMonthDay':
						return (
							<Form.Item
								key={index}
								label={`${row.title} (${labelValue})`}
							>
								<Input.Group compact>
									<Form.Item name={`${row.title.toLowerCase()}_min`} style={{ width: '45%' }}>
										<Input placeholder={`Start ${row.type.toLowerCase()}`} />
									</Form.Item>
									<Form.Item name={`${row.title.toLowerCase()}_max`} style={{ width: '45%' }}>
										<Input placeholder={`End ${row.type.toLowerCase()}`} />
									</Form.Item>
								</Input.Group>
							</Form.Item>
						);

					case 'language':
						return (
							<Form.Item
								key={index}
								name={row.title.toLowerCase()}
								label={`${row.title} (${labelValue})`}
								rules={[
									{
										pattern: /^[a-z]{2}(-[A-Z]{2})?$/,
										message: 'Please input a valid language code (e.g., en-us)!'
									},
									...commonRules,
								]}
							>
								<Input placeholder={`Search by ${row.title.toLowerCase()}`} />
							</Form.Item>
						);

					default:
						return null;
				}
			});
		}
	};

	const onQuerySubmit = async values => {
		const payload = {
			communityId,
			searchQuery: values.searchQuery
		};

		// Call API to create post
		const response = await fetchApi('/api/communities/get-community-posts', payload)
		if (response.data) {
			setPosts(response.data)
		}
	};


	const onAdvancedSearchSubmit = async values => {

		const payload = {
			communityId,
			templateId: selectedTemplate.id,
			advancedSearch: values
		};

		// Call API to create post
		const response = await fetchApi('/api/communities/get-community-posts', payload)
		if (response.data) {
			setPosts(response.data)
		}
	};

	return (
		<div>

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, flexDirection: screens.md ? "" : "column-reverse" }}>
				<Button
					type="primary"
					size="large"
					style={{ backgroundColor: 'white', color: 'black', fontWeight: 500, marginRight: screens.md ? 20 : 0, marginTop: screens.md ? 0 : 20 }}
					onClick={() => setSearchOpen(!searchOpen)}
				>
					<SearchOutlined /> Search in community
				</Button>
				<div style={{ display: 'flex', justifyContent: "center" }}>
					<Button
						type="primary"
						size="large"
						style={{ backgroundColor: '#7952CC', fontWeight: 700, marginRight: 20 }}
						onClick={() => navigate('create-post')}
					>
						+ Add Post
					</Button>
					{communityInfo.memberType === 'owner' && <CreateBadge badges={badges} communityInfo={communityInfo} />}
				</div>
			</div>

			{searchOpen && (
				<Card style={{ marginBottom: 20 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Form
							form={form}
							layout="vertical"
							style={{ width: '100%', marginTop: 20 }}
							onFinish={onQuerySubmit}
						>
							<Form.Item
								name='searchQuery'
							>
								<Input
									placeholder="Search in community"
									style={{ width: '100%', marginRight: 10 }}
									disabled={advancedSearchOpen}
								/>
							</Form.Item>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
								<Button
									type="primary"
									htmlType="submit"
									style={{ backgroundColor: '#7952CC', fontWeight: 700, marginLeft: 'auto', marginRight: 10 }}
									disabled={advancedSearchOpen}
								>
									Search
								</Button>
							</div>

						</Form>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>

						<span style={{ cursor: 'pointer', marginLeft: 5 }} onClick={() => { setAdvancedSearchOpen(!advancedSearchOpen) }}>
							Advanced Search <DownOutlined style={{ fontSize: 10, marginLeft: 5 }} />
						</span>

					</div>
					{/* In advanced search user first selects template according that template show options like range or input */}
					{advancedSearchOpen && (
						<div>

							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
								<Select size='large' placeholder="Select a template" onChange={(value) => { handleTemplateChange(value) }}>
									{templates.length > 0 && templates.map(template => (
										<Select.Option key={template.id} value={template.id}>{template.templateName}</Select.Option>
									))}
								</Select>
							</div>
							<div>
								{selectedTemplate && selectedTemplate.rows && (
									<Form
										form={form}
										layout="vertical"
										style={{ width: '100%', marginTop: 20 }}
										onFinish={onAdvancedSearchSubmit}
									>
										{renderAdvancedSearchFormRows(selectedTemplate.rows)}
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
											<Button
												type="primary"
												htmlType="submit"
												style={{ backgroundColor: '#7952CC', fontWeight: 700, marginLeft: 'auto', marginRight: 10 }}
											>
												Search
											</Button>
										</div>
									</Form>
								)}
							</div>
						</div>
					)}
				</Card>
			)
			}

			{posts.length > 0 && posts.map((post) => (
				<Post postData={post} key={post.id}></Post>
			))}
			{postsLoading ? (
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
				</div>
			) : (
				!posts.length === 0 && <div>No posts found</div>
			)}
			{posts.length === 0 && !postsLoading && (
				<Card style={{ textAlign: 'center', padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
					<p style={{ fontSize: 20 }}>
						No post shared yet. Why don't you start by adding one? 🚀
					</p>
				</Card>
			)}
		</div>
	)
}