import { Layout, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useAuth from "components/Auth/useAuth";
import Navbar from 'components/MainLayout/Navbar';

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout({ children }) {
	const { onLogout, userInfo } = useAuth();
	const navigate = useNavigate();

	return (
		<Layout style={{ minHeight: '100vh' }}>
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
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					{/* Sider Content */}
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>

					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						{children}
					</Content>
					<Footer style={{ textAlign: 'center' }}>huddleup ©{new Date().getFullYear()}</Footer>
				</Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					{/* Sider Content */}
				</Sider>
			</Layout>
		</Layout>
	);
}
