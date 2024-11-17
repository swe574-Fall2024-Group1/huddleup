import { Layout, Avatar, Input, Menu, Dropdown, AutoComplete, Spin, Grid } from 'antd';
import { useState, useEffect } from 'react';
import { UserOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuth from "../Auth/useAuth";
import useApi from '../../hooks/useApi';
import { useNavigate } from "react-router-dom";


const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
	const { onLogout, userInfo } = useAuth();
	const navigate = useNavigate();

	const [mainSearchAllItems, setMainSearchAllItems] = useState([]);
	const [mainSearchAllItemsLoading, setMainSearchAllItemsLoading] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [searchLoading, setSearchLoading] = useState(false);

	// Menu for the dropdown
	const menu = (
		<Menu>
			<Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
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
			...communities.map(item => ({ value: `Community: ${item.name}`, label: `Community: ${item.name}`, id: item.id, type: 'community'})),
			...users.map(item => ({ value: `User: ${item.username}`, label: `User: ${item.username}`, id: item.id, type: 'user'}))
		];

		setSearchResults(results);
		setSearchLoading(false);
	};

	const handleSelect = (value, option) => {
		if (option.type === 'community') {
			navigate(`/communities/${option.id}`);
		}
	};

	const screens = useBreakpoint();

	return (
		<Header style={{
            background: '#fff',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: screens.sm ? 'center' : 'flex-start',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
            borderBottom: '3px solid #f0f0f0',
            textAlign: screens.sm ? 'left' : 'center',
        }}>
            <div className='logo' style={{ margin: screens.sm ? '10px 40px' : '0px', fontWeight: 800, fontSize: screens.sm ? 35 : 25 }}>
                <Link to="/feed" style={{ color: 'inherit', textDecoration: 'none' }}>huddleup</Link>
            </div>

            {screens.md && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AutoComplete
                        style={{ width: screens.md ? 300 : '100%' }}
                        options={searchResults}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        notFoundContent={searchLoading ? <Spin size="small" /> : null}
                    >
                        <Input addonBefore={<SearchOutlined />} placeholder="Search for communities and users" />
                    </AutoComplete>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', margin: screens.sm ? '0 20px' : '0px' }}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', color: '#5c5b5b', fontWeight: 600 }}>
                        <span style={{ marginRight: screens.sm ? 5 : 0 }}>{userInfo?.username}</span>
                        <Avatar icon={<UserOutlined />} style={{ marginLeft: 8, marginRight: screens.sm ? 8 : 0 }} />
                    </a>
                </Dropdown>
            </div>
        </Header>
	);
};

export default Navbar;