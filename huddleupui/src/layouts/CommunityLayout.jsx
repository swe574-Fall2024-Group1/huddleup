import { Layout, Avatar } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useAuth from "components/Auth/useAuth";
import Navbar from "components/MainLayout/Navbar";
import { useParams } from 'react-router-dom';
import useCommunity from 'components/Community/useCommunity';

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout({ children }) {
	const { communityInfo } = useCommunity();

	const navigate = useNavigate();

	const { communityId } = useParams();

	const handleMembershipChange = () => {
		if (communityInfo.memberType === 'notMember') {
			// Join
			console.log('Joining community');
		} else {
			// Leave
			console.log('Leaving community');
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					{/* Sider Content */}
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Header style={{ background: '#fff', display: 'flex' }}>
						{communityInfo ? (
							<>
								<h2>{communityInfo.name || ''}</h2>

								<div style={{display: 'flex'}}>
									{communityInfo.memberType === 'owner' && <p>You are the owner of this community</p>}
									{communityInfo.memberType === 'member' && <p>You are a member of this community</p>}
									{communityInfo.memberType === 'moderator' && <p>You are a moderator of this community</p>}
									{communityInfo.memberType === 'notMember' && <p>You are not a member of this community</p>}

									<button onClick={handleMembershipChange}>
										{communityInfo.memberType === 'notMember' ? 'Join' : 'Leave'}
									</button>
								</div>
							</>
						) : (
							<>
								<h2></h2>
								<h2></h2>
							</>
						)}


					</Header>
					<Layout>
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
						<Sider width={200} style={{ background: '#fff' }}>
							{/* Sider Content */}
						</Sider>
					</Layout>

					<Footer style={{ textAlign: 'center' }}>huddleup ©{new Date().getFullYear()}</Footer>
				</Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					{/* Sider Content */}
				</Sider>
			</Layout>
		</Layout>
	);
}
