import { Layout, Avatar, Input, Menu, Dropdown, AutoComplete, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { UserOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuth from "../Auth/useAuth";
import useApi from '../../hooks/useApi';

const { Header } = Layout;

const Navbar = () => {
	const { onLogout, userInfo } = useAuth();

	const [mainSearchAllItems, setMainSearchAllItems] = useState([]);
	const [mainSearchAllItemsLoading, setMainSearchAllItemsLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);

	// Menu for the dropdown
	const menu = (
		<Menu>
			<Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
				Log Out
			</Menu.Item>
		</Menu>
	);

	const main_search_result = useApi('/api/communities/get-main-search', {});

	useEffect(() => {
		main_search_result.then((response) => {
			if (response && !response.loading && mainSearchAllItemsLoading) {
				setMainSearchAllItems(response.data.data);
				setMainSearchAllItemsLoading(false);
			}
		});
	}, [main_search_result, mainSearchAllItemsLoading]);

	const handleSearch = (value) => {
		if (!value) {
			setSearchResults([]);
			return;
		}

		setSearchLoading(true);

		const communities = mainSearchAllItems.communities.filter(item =>
			item.name.toLowerCase().includes(value.toLowerCase())
		);
		const users = mainSearchAllItems.users.filter(item =>
			item.username.toLowerCase().includes(value.toLowerCase())
		);

		const results = [
			...communities.map(item => ({ value: `Community: ${item.name}`, label: `Community: ${item.name}` })),
			...users.map(item => ({ value: `User: ${item.username}`, label: `User: ${item.username}` }))
		];

		setSearchResults(results);
		setSearchLoading(false);
	};

	return (
		<div>
			<Header style={{
				background: '#fff',
				padding: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
				borderBottom: '3px solid #f0f0f0',
			}}>
				<div className='logo' style={{ marginLeft: 40, marginTop: 10, fontWeight: 800, fontSize: 35 }}>
					<Link to="/feed" style={{ color: 'inherit', textDecoration: 'none' }}>huddleup</Link>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<AutoComplete
						style={{ width: 300 }}
						options={searchResults}
						onSearch={handleSearch}
						notFoundContent={searchLoading ? <Spin size="small" /> : null}
					>
						<Input addonBefore={<SearchOutlined />} placeholder="Search for communities and users" />
					</AutoComplete>
				</div>
				{/* Profile Section */}
				<div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
					<Dropdown overlay={menu} trigger={['click']}>
						<a onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', color: '#5c5b5b', fontWeight: 600 }}>
							<span style={{ marginRight: 5 }}>{userInfo?.username}</span>
							<Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
						</a>
					</Dropdown>
				</div>
			</Header>
		</div>
	);
};

export default Navbar;