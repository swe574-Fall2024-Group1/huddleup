import { Layout, Avatar, Input, Menu, Dropdown } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuth from "../Auth/useAuth";

const { Header } = Layout;

const Navbar = () => {
    const { onLogout, userInfo } = useAuth();

    // Menu for the dropdown
    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                Log Out
            </Menu.Item>
        </Menu>
    );

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
                    <Input addonBefore={<SearchOutlined />} placeholder="Search for communities and users" style={{ width: 300 }} />
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