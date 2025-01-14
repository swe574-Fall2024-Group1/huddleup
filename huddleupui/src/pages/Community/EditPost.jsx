/* global BigInt */
import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { AimOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Button, Input, InputNumber, DatePicker, message, Checkbox, Card, Select, AutoComplete, Tag, Grid} from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchApi from '../../api/fetchApi';
import '../../assets/community.css';
import axios from 'axios';
import debounce from 'lodash/debounce';

const { useBreakpoint } = Grid;

export default function EditPost() {
	const [form] = Form.useForm();
	const [post, setPost] = useState(null);
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	const navigate = useNavigate();
	const { communityId, postId } = useParams();

	const [tags, setTags] = useState([]);
  	const [suggestedTags, setSuggestedTags] = useState([]); // For tags from backend
  	const [tagInput, setTagInput] = useState("");

	  const [isLoadingLoc, setIsLoadingLoc] = useState(false);
	  const [longitude, setLongtitude] = useState(28.994504653991893);
	  const [latitude, setLatitude] = useState(41.039040946957925);
  
	  const screens = useBreakpoint();

	useEffect(() => {
		async function fetchPostAndTemplate() {
			const response = await fetchApi(`/api/communities/get-post-details`, { postId });
			if (response && response.data) {
				setPost(response.data.post);
				setSelectedTemplate(response.data.template);
				setTags(response.data.post.tags);
				form.setFieldsValue({
					...response.data.post.rowValues.reduce((acc, curr, index) => ({ ...acc, [index]: curr }), {}),
				});
			}
		}

		fetchPostAndTemplate();
	}, [postId, form]);

	// Fetch tags from backend for autocomplete suggestions
  const fetchTags = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(`/api/communities/tags?search=${query}`);
        setSuggestedTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    } else {
      setSuggestedTags([]);
    }
  };

  const debouncedFetchTags = useCallback(debounce(fetchTags, 300), []);

  useEffect(() => {
    debouncedFetchTags(tagInput);
  }, [tagInput, debouncedFetchTags]);

  const handleTagRemove = (removedTag) => {
	setTags(tags.filter(tag => tag.id !== removedTag));
	};

  	const handleAddTag = (value, option) => {
	  	console.log(option);
	  	// Find the selected tag using the unique `id`
		const selectedTag = suggestedTags.find((item) => item.id === option.key);

		// Prevent duplicates
		if (selectedTag && !tags.find((tag) => tag.id === selectedTag.id)) {
		  setTags([...tags, selectedTag]);
		}

		setTagInput(""); // Clear input after selection

  	};

	const onFormSubmit = async values => {
		const rowValues = Object.values(values);
		const payload = {
			postId,
			templateId: selectedTemplate.id, // Assuming the templateId is necessary for backend processing
			rowValues,
			tags: tags
		};

		const response = await fetchApi('/api/communities/edit-post', payload);

		if (response && response.success) {
			message.success('Post updated successfully!');
			navigate(`/communities/${communityId}`);
		} else {
			message.error('Failed to update post. Please try again.');
		}
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

	const renderFormrows = (rows) => {
		if (rows.length > 0) {
			return rows.map((row, index) => {
				const commonRules = [];
				if (row.required) {
					commonRules.push({ required: true, message: `Please input your ${row.title.toLowerCase()}!` });
				}
				const selectedType = typeOptions.find(option => option.key === row.type);
				const labelValue = selectedType ? selectedType.value : row.type;
				switch (row.type) {
					case 'string':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={commonRules}
							>
								<Input />
							</Form.Item>
						);
					case 'normalizedString':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (value) {
													// Convert all whitespace characters to single spaces
													const normalizedValue = value.replace(/\s+/g, ' ');
													if (normalizedValue !== value) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												} else {
													resolve(); // Empty value, consider it valid
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'token':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (/\s{2,}/.test(value)) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'hex64Binary':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													const isValidBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(value);
													if (!isValidBase64) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'hexBinary':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													const isValidHexBinary = /^[0-9A-Fa-f]*$/.test(value);
													if (!isValidHexBinary) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'Name':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													const isValidName = /^[A-Za-z_:][\w.\-_:]*$/.test(value);
													if (!isValidName) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'QName':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													const isValidQName = /^{[^{}]+}[^{}]+$/.test(value);
													if (!isValidQName) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'NCName':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {

													const isValidNCName = /^[^:]+:.+$/.test(value);
													if (!isValidNCName) {
														reject(`Please input a valid ${row.type.toLowerCase()}!`);
													}else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'anyURI':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										type: 'url',
										message: 'Please enter a valid URL',
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'byte':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (value >= -128 && value <= 127) {
														resolve();
													} else {
														reject('Value must be between -128 and 127');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'nonNegativeInteger':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {

													if (!Number.isInteger(value) || value < 0) {
														reject(`Please input a valid ${row.title.toLowerCase()}!`);
													}else {
														resolve();
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'nonPositiveInteger':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {

													if (Number.isInteger(value) && value <= 0) {
														resolve();
													} else {
														reject('Value must be a non-positive integer');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'int':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													const min = -2147483648;
													const max = 2147483647;
													if (Number.isInteger(value) && value >= min && value <= max) {
														resolve();
													} else {
														reject(`Value must be between ${min.toLocaleString()} and ${max.toLocaleString()}`);
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'long':
						const validateLong = (_, value) => {
							return new Promise((resolve, reject) => {
								if (!value) {
									resolve(); // Allow submission when value is empty
								} else {
									const min = BigInt('-9223372036854775808');
									const max = BigInt('9223372036854775807');
									const parsedValue = typeof value === 'string' ? BigInt(value) : value; // Convert to BigInt if not already
									if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
										resolve();
									} else {
										reject(`Value must be between ${min.toLocaleString()} and ${max.toLocaleString()}`);
									}
								}
							});
						};

						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ validator: validateLong },
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'unsignedLong':
						const validateUnsignedLong = (_, value) => {
							return new Promise((resolve, reject) => {
								if (!value) {
									resolve(); // Allow submission when value is empty
								} else {
									const max = BigInt('18446744073709551615');
									const parsedValue = typeof value === 'string' ? BigInt(value) : value;
									if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= max) {
										resolve();
									} else {
										reject(`Value must be between 0 and ${max.toLocaleString()}`);
									}
								}
							});
						};

						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ validator: validateUnsignedLong },
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'short':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'number', message: `Please input a valid ${row.title.toLowerCase()}!` },
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {

													if (!isNaN(value) && value >= -32768 && value <= 32767) {
														resolve();
													} else {
														reject('Value must be between -32,768 and 32,767');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'unsignedShort':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'number', message: `Please input a valid ${row.title.toLowerCase()}!` },
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (!isNaN(value) && value >= 0 && value <= 65535) {
														resolve();
													} else {
														reject('Value must be between 0 and 65,535');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'unsignedByte':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (value >= 0 && value <= 255) {
														resolve();
													} else {
														reject('Value must be between 0 and 255');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'integer':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'integer', message: `Please input a valid ${row.title.toLowerCase()}!` },
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'unsignedInt':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (!Number.isInteger(value) || value < 0 || value > 4294967295) {
														reject('Value must be between 0 and 4,294,967,295');
													} else {
														resolve();
													}
												}
											});
										},
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'positiveInteger':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (Number.isInteger(value) && value > 0) {
														resolve();
													} else {
														reject('Value must be a positive integer');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'negativeInteger':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: (_, value) => {
											return new Promise((resolve, reject) => {
												if (!value) {
													resolve(); // Allow submission when value is empty
												} else {
													if (Number.isInteger(value) && value < 0) {
														resolve();
													} else {
														reject('Value must be a negative integer');
													}
												}
											});
										}
									},
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'float':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'number', message: `Please input a valid ${row.type.toLowerCase()}!` },
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);
					case 'double':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'number', message: `Please input a valid ${row.type.toLowerCase()}!` },
									...commonRules,
								]}
							>
								<InputNumber />
							</Form.Item>
						);

					case 'Boolean':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								valuePropName="checked"
								rules={commonRules}
							>
								<Checkbox />
							</Form.Item>
						);

					case 'time':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, message: 'Please input a valid time in the format HH:MM:SS!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'date':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'date', message: 'Please input a valid date in the format YYYY-MM-DD!' },
									...commonRules,
								]}
							>
								<DatePicker />
							</Form.Item>
						);

					case 'dateTime':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ type: 'date', message: 'Please input a valid date and time in the format YYYY-MM-DD HH:MM:SS!' },
									...commonRules,
								]}
							>
								<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
							</Form.Item>
						);

					case 'duration':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/, message: 'Please input a valid duration!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'gMonth':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^(0[1-9]|1[0-2])$/, message: 'Please input a valid Gregorian month (MM)!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'gYear':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^\d{4}$/, message: 'Please input a valid Gregorian year (YYYY)!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'gYearMonth':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^\d{4}-(0[1-9]|1[0-2])$/, message: 'Please input a valid Gregorian year-month (YYYY-MM)!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'gDay':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^(0[1-9]|[1-2]\d|3[01])$/, message: 'Please input a valid Gregorian day (DD)!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);

					case 'gMonthDay':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{ pattern: /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, message: 'Please input a valid Gregorian month-day (MM-DD)!' },
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'image':
						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								valuePropName="filelist"
								getValueFromEvent={normFile}
								rules={commonRules}
							>
								<Input type="file" accept="image/*" onChange={async (e) => {
									const file = e.target.files[0];

									if (file) {
										const reader = new FileReader();
										reader.onloadend = () => {
											form.setFieldsValue({ [index]: reader.result });
										};
										reader.readAsDataURL(file);
									}
								}} />
							</Form.Item>
						);
					case 'language':
						const validateLanguage = (_, value) => {
							return new Promise((resolve, reject) => {
								const languageCodePattern = /^[a-z]{2}(-[A-Z]{2})?$/;
								if (!value) {
									resolve(); // Allow submission when value is empty
								} else {
									if (languageCodePattern.test(value)) {
										resolve();
									} else {
										reject('Please input a valid language code as defined in RFC 1766 (e.g., en-us)!');
									}
								}

							});
						};

						return (
							<Form.Item
								key={index}
								name={index}
								label={row.title + `  (${labelValue})`}
								rules={[
									{
										validator: validateLanguage
									},
									...commonRules,
								]}
							>
								<Input />
							</Form.Item>
						);
					case 'geolocation':
						const handleLongitude = (e, isAuto = false) => {
							let longitude = 0.0;
							if (isAuto) {
								longitude = e;	
							} else {
								longitude = e.target.valueAsNumber;
							}
							const errors = form.getFieldError(index);
							if (Number.isFinite(longitude) && longitude >= -180 && longitude <= 180) {
								const currentValue = form.getFieldValue(index) || [];
								form.setFieldsValue({ [index]: [longitude, currentValue[1]] });
								setLongtitude(longitude);
								if (errors.length > 0) {
									// Remove longitude error from errors array
									const newErrors = errors.filter(e => e !== 'Longitude must be a valid number between -180 and 180')

									form.setFields([
										{
											name: index,
											errors: newErrors,
										},
									]);
								}
							} else {
								// Display error message for invalid latitude

								let newErrors = [...errors]
								if (!errors.includes('Longitude must be a valid number between -180 and 180')) {
									newErrors.push('Longitude must be a valid number between -180 and 180')
								}

								form.setFields([
									{
										name: index,
										errors: newErrors,
									},
								]);
							}
						};

						const handleLatitude = (e, isAuto = false) => {
							let latitude = 0.0;
							if (isAuto) {
								latitude = e;	
							} else {
								latitude = e.target.valueAsNumber;
							}
							const errors = form.getFieldError(index);

							if (Number.isFinite(latitude) && latitude >= -90 && latitude <= 90) {
								const currentValue = form.getFieldValue(index) || [];
								form.setFieldsValue({ [index]: [currentValue[0], latitude] });
								setLatitude(latitude);
								if (errors.length > 0) {
									// Remove longitude error from errors array
									const newErrors = errors.filter(e => e !== 'Latitude must be a valid number between -90 and 90')
									form.setFields([
										{
											name: index,
											errors: newErrors,
										},
									]);
								}
							} else {
								// Display error message for invalid latitude
								const errors = form.getFieldError(index);
								let newErrors = [...errors]
								if (!errors.includes('Latitude must be a valid number between -90 and 90')) {
									newErrors.push('Latitude must be a valid number between -90 and 90')
								}

								form.setFields([
									{
										name: index,
										errors: newErrors,
									},
								]);
							}
						};

						const resetLocation = () => {
							const defaultLocation =  [41.039040946957925, 28.994504653991893];
							setLatitude(defaultLocation[0]);
							setLongtitude(defaultLocation[1]);
							setIsLoadingLoc(false);
						}

						const setLocation = (e) => {
							handleLongitude(e.lng, true);
							handleLatitude(e.lat, true);
							setIsLoadingLoc(true);
						}

						const getUserLocation = () => {
							// if geolocation is supported by the users browser
							if (navigator.geolocation) {

								// get the current users location
							  navigator.geolocation.getCurrentPosition(
								(position) => {
								  // save the geolocation coordinates in two variables
								  const { latitude, longitude } = position.coords;
								  console.log({ latitude, longitude });
								  // update the value of userlocation variable
								  handleLongitude(longitude, true);
								  handleLatitude(latitude, true);
								  setIsLoadingLoc(true);
								},
								// if there was an error getting the users location
								(error) => {
								  console.error('Error getting user location:', error);
								},
								{
									enableHighAccuracy: true,
									timeout: 5000,
									maximumAge: 0,
								}
							  );

							}
							// if geolocation is not supported by the users browser
							else {
							  console.error('Geolocation is not supported by this browser.');
							}
						  };

						function LocationMarker() {
							const map = useMapEvents({
								click(e) {
								setLocation(e.latlng);
									map.flyTo(e.latlng, map.getZoom());
								},
							});
							return <Marker position={[latitude, longitude]}>
								<Popup>Selected Location</Popup>
							</Marker>;
						}
						const RecenterAutomatically = ({lat,lng}) => {
							const map = useMap();
							 useEffect(() => {
							   map.setView([lat, lng]);
							 }, [lat, lng]);
							 return null;
						   }

						return (
							<>
								<Form.Item
									key={index}
									name={index}
									label={row.title + `  (${labelValue})`}
									validateStatus={form.getFieldError(index).length > 0 ? 'error' : 'success'}
									help={form.getFieldError(index).length > 0 ? form.getFieldError(index) : null}
								>
									<Input.Group style={{display: "none", justifyContent: "space-between"}}>
										<Input
											key='longitude'
											name='longitude'
											style={{ width: '15%' }}
											addonBefore="LON"
											type="number"
											disabled={isLoadingLoc}
											onChange={(e) => { handleLongitude(e) }}
											required={row.required}
										/>
										<Input
											key='latitude'
											name='latitude'
											style={{ width: '15%' }}
											addonBefore="LAT"
											type="number"
											disabled={isLoadingLoc}
											onChange={(e) => { handleLatitude(e) }}
											required={row.required}
										/>
									</Input.Group>
								</Form.Item>
								<div style={{ display: "flex", marginBottom: "1rem" }}>
									<Button 
										onClick={() => isLoadingLoc ? resetLocation() : getUserLocation()}
										style={{marginLeft: 5, display: screens.md ? "none" : "block", marginRight: 10}}>
											{isLoadingLoc ? <CloseOutlined /> :<AimOutlined />}
									</Button>
									<span style={{display: !isLoadingLoc ? "none": "block", alignSelf: "center"}}>
										Geolocation set. LAT: {latitude} LON: {longitude}
									</span>
								</div>
								<MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={false} style={{height: 400 ,width: "100%", marginBottom: "1rem"}}>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
									<LocationMarker />
									<RecenterAutomatically lat={latitude} lng={longitude} />
								</MapContainer>
							</>
						);
					default:
						return null;
				}
			});
		}
	};

	const normFile = e => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<h2 style={{ color: '#5c5b5b', marginLeft: 5 }}>
					Edit Post
				</h2>
				<Link to={`/communities/${communityId}`} style={{ marginLeft: 'auto', marginTop: 10 }}>
					<Button>Back to Community</Button>
				</Link>
			</div>

			<Card>
				{selectedTemplate && (
					<Form form={form} layout="vertical" onFinish={onFormSubmit}>
						{renderFormrows(selectedTemplate.rows)}
						<AutoComplete
						style={{ width: "100%", marginBottom: "10px" }}
						options={suggestedTags.map((item) => ({
								  value: item.id.toString(),
								  label: (
									<div>
									  <strong>{item.name}</strong>
									  <p style={{ margin: 0 }}>{item.description}</p>
									</div>
								  ),
								  key: item.id,
								}))}
						value={tagInput}
						onSearch={(value) => setTagInput(value)}
						onSelect={handleAddTag}
						placeholder="Add a tag"
					  />

					  <div>
						{tags.map(tag => (
						  <Tag
							key={tag.id}
							closable
							onClose={() => handleTagRemove(tag.id)}
						  >
							{tag.name}
						  </Tag>
						))}
                        <link
                          rel="stylesheet"
                          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                          integrity="sha512-xodZBNTC5n17Xt2vOTI4g9E74pI1IzRIcOa2fTUmJa65Df9acm0o7K4w5p1u7n5V6hk6K3szr5P5u7Oo1X3Mxg=="
                          crossorigin=""
                        />
					  </div>
						<Form.Item style={{ marginTop: 20 }}>
							<Button type="primary" size="large" htmlType="submit" style={{ backgroundColor: '#7952CC', fontWeight: 700 }}>
								Update Post
							</Button>
						</Form.Item>
					</Form>
				)}
			</Card>
		</div>
	);
}
