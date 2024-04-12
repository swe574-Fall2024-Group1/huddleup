import { Layout, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import useAuth from "components/Auth/useAuth";

const { Header, Content, Footer, Sider } = Layout;

const Navbar = () => {

	const { onLogout, userInfo } = useAuth();

	return (
		<Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div style= {{ color: "#552299"}}>huddleup</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<input type="text" placeholder="Search communities" style={{ marginRight: 16 }} />
					<BellOutlined style={{ marginRight: 16 }} />
				</div>
				{/* Profile Section */}
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
					<span>{userInfo?.username}</span>
				</div>
			</Header>
	);
};

export default Navbar