import { Layout, Avatar, Input } from 'antd';
import { UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, } from 'react-router-dom';
import useAuth from "components/Auth/useAuth";

const { Header } = Layout;

const Navbar = () => {

	const { onLogout, userInfo } = useAuth();

	return (
		<div >
			<Header style={{
				background: '#fff',
				padding: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				// shadow under navbar with border bottom
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
				borderBottom: '3px solid #f0f0f0',
			}}>
				<div className='logo' style={{ marginLeft: 40, marginTop: 10, fontWeight: 800, fontSize: 35 }}>
					<Link to="/feed" style={{ color: 'inherit', textDecoration: 'none' }}>huddleup</Link>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Input addonBefore={<SearchOutlined />} placeholder="Search for communities and users" style={{width: 300}} />
				</div>
				{/* Profile Section */}
				<div style={{ display: 'flex', alignItems: 'center', marginRight:20 }}>
					<span style={{ color: '#5c5b5b', fontWeight:600, marginRight: 5 }}>{userInfo?.username}</span>
					<Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
				</div>
			</Header>
		</div>

	);
};

export default Navbar