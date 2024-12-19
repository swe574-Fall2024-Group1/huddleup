/* global BigInt */
import React, { useState, useCallback, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { AimOutlined, CloseOutlined } from '@ant-design/icons';
import { Steps, Form, Button, Select, Input, InputNumber, DatePicker, message, Checkbox, Card, Tag, AutoComplete, Grid } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fetchApi from '../../api/fetchApi';
import useApi from '../../hooks/useApi';
import '../../assets/community.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';

const { Step } = Steps;
const { useBreakpoint } = Grid;

export default function CreatePost() {
	const [currentStep, setCurrentStep] = useState(0);
	const [templates, setTemplates] = useState([]);
	const [selectedTemplate, setSelectedTemplate] = useState({});
	const [form] = Form.useForm();
	const [isLoadingLoc, setIsLoadingLoc] = useState(false);
	const [longitude, setLongitude] = useState(28.994504653991893);
	const [latitude, setLatitude] = useState(41.039040946957925);

	const screens = useBreakpoint();

	const navigate = useNavigate();

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
	const [tags, setTags] = useState([]);
  	const [suggestedTags, setSuggestedTags] = useState([]); // For tags from backend
  	const [tagInput, setTagInput] = useState("");


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


	const next = () => {
		if (!selectedTemplate) {
			message.error('Please select a template first!');
			return;
		}
		setCurrentStep(currentStep + 1);
	};

	const prev = () => {
		setCurrentStep(currentStep - 1);
	};

	const onFormSubmit = async values => {
		const rowValues = Object.values(values);
		const payload = {
			communityId,
			templateId: selectedTemplate.id,
			rowValues,
			tags: tags
		};

		// Call API to create post
		await fetchApi('/api/communities/create-post', payload)

		message.success('Post created successfully!');
		navigate(`/communities/${communityId}`);
		setCurrentStep(0);
		setSelectedTemplate(null);
	};

	const onFinishFailed = (errorInfo) => {
		message.error(errorInfo)
	  };

	const fetchTags = async (query) => {
    if (query.length >= 3) { // Only fetch if input is at least 3 characters
      try {
        const response = await axios.get(`/api/communities/tags?search=${query}`);
        setSuggestedTags(response.data); // Assumes the API returns an array of tag strings
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    } else {
      setSuggestedTags([]);
    }
  };

	const handleTagRemove = (removedTag) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };
	  const handleAddTag = (tag) => {
    const lowerCaseTag = tag.toLowerCase();
    if (lowerCaseTag.length >= 3 && !tags.includes(lowerCaseTag)) {
      setTags([...tags, lowerCaseTag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

	const debouncedFetchTags = useCallback(debounce(fetchTags, 300), []);

	// Trigger API call whenever tagInput changes
  useEffect(() => {
    if (tagInput) {
      debouncedFetchTags(tagInput);
    } else {
      setSuggestedTags([]);
    }
  }, [tagInput, debouncedFetchTags]);

const renderGeolocationField = () => {
  const handleMapClick = ({ latlng }) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
    form.setFieldsValue({ geolocation: [latlng.lat, latlng.lng] });
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });
    return (
      <Marker position={[latitude, longitude]}>
        <Popup>Selected Location</Popup>
      </Marker>
    );
  };

const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng]);
     return null;
   }

  return (
    <div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        style={{ height: 400, width: "100%", marginBottom: "1rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <RecenterAutomatically lat={latitude} lng={longitude} />
      </MapContainer>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span>
          Latitude: {latitude.toFixed(6)}, Longitude: {longitude.toFixed(6)}
        </span>
        <Button
          icon={<AimOutlined />}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
              setLatitude(coords.latitude);
              setLongitude(coords.longitude);
              form.setFieldsValue({ geolocation: [coords.latitude, coords.longitude] });
            });
          }}
        >
          Use Current Location
        </Button>
      </div>
    </div>
  );
};



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
														resolve()
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
													}else{
														resolve()
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
						return (
                            <Form.Item
                              key={index}
                              name="geolocation"
                              label={row.title}
                              rules={[{ required: row.required, message: "Please select a location on the map!" }]}
                            >
                              {renderGeolocationField()}
                            </Form.Item>
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
					Adding new post
				</h2>
				<Link to={`/communities/${communityId}`} style={{ marginLeft: 'auto', marginTop: 10 }}>
					<Button  >
						Back to Community
					</Button>
				</Link>
			</div>

			<Card>

				<Steps current={currentStep} >
					<Step title="Select Template" />
					<Step title="Fill Template" />
				</Steps>

				<div className="steps-content" style={{ marginTop: '20px' }}>
					{currentStep === 0 && (
						<Form form={form} layout="vertical">
							<Form.Item label="Select a Template" name="template">
								<Select size='large' placeholder="Select a template" onChange={(value) => { handleTemplateChange(value) }}>
									{templates.length > 0 && templates.map(template => (
										<Select.Option key={template.id} value={template.id}>{template.templateName}</Select.Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									size="large"
									style={{ backgroundColor: '#7952CC', fontWeight: 700, float: 'right' }}
									onClick={next}
								>
									Next
								</Button>
							</Form.Item>
						</Form>
					)}

					{currentStep === 1 && selectedTemplate && (
						<Form form={form} layout="vertical" onFinish={onFormSubmit} onFinishFailed={onFinishFailed}>
							{renderFormrows(selectedTemplate.rows)}
							<AutoComplete
								style={{width: 200, marginBottom: "10px"}}
								options={suggestedTags
									.filter(tag => !tags.includes(tag))
									.map(tag => ({value: tag}))}
								value={tagInput}
								onChange={(value) => setTagInput(value.toLowerCase())} // Convert to lowercase on input
								onSelect={handleAddTag}
								placeholder="Add a tag"
								onBlur={() => handleAddTag(tagInput)} // Create new tag if it doesn't exist
							/>
							<div>
								{tags.map(tag => (
									<Tag
										key={tag}
										closable
										onClose={() => handleTagRemove(tag)}
									>
										{tag}
									</Tag>
								))}
								<link
                                  rel="stylesheet"
                                  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                                  integrity="sha512-xodZBNTC5n17Xt2vOTI4g9E74pI1IzRIcOa2fTUmJa65Df9acm0o7K4w5p1u7n5V6hk6K3szr5P5u7Oo1X3Mxg=="
                                  crossorigin=""
                                />

							</div>
							<Form.Item style={{float: 'right'}}>

								<Button
									type="primary"
									size="large"
									style={{backgroundColor: '#7952CC', fontWeight: 700}}
									onClick={prev}
								>
									Previous
								</Button>

								<Button style={{backgroundColor: '#7952CC', marginLeft: 5, fontWeight: 700}}
										size="large"
										type="primary" htmlType="submit"
										disabled={(templates && templates.length === 0)}>
									Submit
								</Button>
							</Form.Item>
						</Form>
					)}
				</div>
			</Card>
		</div>

	);
}