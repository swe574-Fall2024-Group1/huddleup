import { Layout, Card, Avatar, Row, Col, Modal, Button, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Navbar from "components/MainLayout/Navbar";
import fetchApi from 'api/fetchApi';
import { useParams } from 'react-router-dom';
import useApi from 'hooks/useApi';
import useCommunity from 'components/Community/useCommunity';
import LeftSidebar from 'components/MainLayout/LeftSidebar';
import { LockOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

export default function CommunityLayout({ children, allowedUserTypes }) {
	const { communityInfo } = useCommunity();
	const [members, setMembers] = useState([]);
	const [membersLoading, setMembersLoading] = useState(true);
	const [moderators, setModerators] = useState([]);
	const [moderatorsLoading, setModeratorsLoading] = useState(true);
	const [owners, setOwners] = useState([]);
	const [ownersLoading, setOwnersLoading] = useState(true);

	const [showMoreMembersModal, setShowMoreMembersModal] = useState(false);
	const [showMoreModeratorsModal, setShowMoreModeratorsModal] = useState(false);
	const [showMoreOwnersModal, setShowMoreOwnersModal] = useState(false);

	const navigate = useNavigate();

	const { communityId } = useParams();

	const handleMembershipChange = async () => {
		if (communityInfo.memberType === 'notMember') {
			const response = await fetchApi('/api/communities/join-community', { communityId });
			if (response.success) {
				window.location.reload();
			}
		} else {
			const response = await fetchApi('/api/communities/leave-community', { communityId });
			if (response.success) {
				window.location.reload();
			}
		}
	}

	const members_result = useApi('/api/communities/get-community-members', { communityId });

	members_result.then((response) => {
		if (response && !response.loading && membersLoading) {
			setMembers(response.data.data);
			setMembersLoading(false);
		}
	});

	const moderators_result = useApi('/api/communities/get-community-moderators', { communityId });

	moderators_result.then((response) => {
		if (response && !response.loading && moderatorsLoading) {
			setModerators(response.data.data);
			setModeratorsLoading(false);
		}
	});

	const owners_result = useApi('/api/communities/get-community-owners', { communityId });

	owners_result.then((response) => {
		if (response && !response.loading && ownersLoading) {
			console.log(response.data.data);
			setOwners(response.data.data);
			setOwnersLoading(false);
		}
	});

	const handleShowMoreMembers = () => {
		setShowMoreMembersModal(true);
	};

	const handleShowMoreModerators = () => {
		setShowMoreModeratorsModal(true);
	};

	const handleShowMoreOwners = () => {
		setShowMoreOwnersModal(true);
	};

	const closeModal = () => {
		setShowMoreMembersModal(false);
		setShowMoreModeratorsModal(false);
		setShowMoreOwnersModal(false);
	};

	if (communityInfo && !communityInfo.isPrivate) {
		allowedUserTypes.push('notMember');
	}


	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />
			<Layout>
				<LeftSidebar />
				<Layout style={{ padding: '0 24px 24px' }}>
					<div style={{ display: 'flex', alignItems: 'center', marginTop: 20, marginBottom: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
						{Object.keys(communityInfo).length > 0 ? (
							<>
								{communityInfo && communityInfo.mainImage && (
									<img
										alt={communityInfo.name}
										src={`${communityInfo.mainImage}`}
										style={{
											marginLeft: 10,
											width: '100px',
											height: '100px',
											objectFit: 'cover',
											borderRadius: 10,
											boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
										}}
									/>
								)}
								<div style={{ marginLeft: 40, fontWeight: 500, color: '#626263' }}>
									<h2>{communityInfo ? communityInfo.name : ''}</h2>
									{communityInfo.isPrivate ? (
										<div>
											{' '}
											<LockOutlined style={{ marginRight: 5 }} />Private Community{' '}
										</div>
									) : (
										<div>
											{' '}
											<UserOutlined style={{ marginRight: 5 }} />Public Community{' '}
										</div>
									)}
									{communityInfo && communityInfo.memberType && communityInfo.memberType !== 'notMember' && (
										<p>{`You are ${communityInfo.memberType} of this community`}</p>
									)}
									{communityInfo && !communityInfo.isPrivate && (
										<Button
											style={{ backgroundColor: '#7952CC', fontWeight: 700, marginTop: 10 }}
											type="primary"
											onClick={handleMembershipChange}
										>
											{communityInfo.memberType === 'notMember' ? 'Join' : 'Leave'}
										</Button>
									)}

									{communityInfo && communityInfo.isPrivate && communityInfo.memberType === 'notMember' && (
										<div style={{ marginTop: 20, color: '#626263', fontSize: 12 }}>
											This community is private. You need an invitation to join.
										</div>
									)}
								</div>
							</>
						) : (
							<div style={{ textAlign: 'center', margin: 'auto' }}>
								<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
							</div>
						)}
					</div>
					<Layout>
						<Content
							className="site-layout-background"
							style={{
								marginTop: 10,
								minHeight: 280,
							}}
						>
							{allowedUserTypes.includes(communityInfo && communityInfo.memberType) ? (
								children // Render children if allowed
							) : (
								communityInfo && communityInfo.memberType ? (
									<Card>
										<p style={{ textAlign: 'center', color: '#626263', fontSize: 20, fontWeight: 500 }}>You have to be a member to see posts of private communities.</p>
										<p style={{ textAlign: 'center', color: '#626263', fontSize: 20, fontWeight: 500 }}>You don't have an invitation yet? Check your <a href='/invitations' style={{ color: "#7952CC", textDecoration: "none" }}>invitations</a>.</p>
									</Card>
								) : (
									<div style={{ textAlign: 'center' }}>
										<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
									</div>
								)
							)}
						</Content>
					</Layout>
					<Footer className='logo' style={{ textAlign: 'center', fontWeight: 700, color: '#a1a1a1' }}>huddleup ©{new Date().getFullYear()}</Footer>
				</Layout>
				<Sider width={300} style={{ background: 'transparent', borderTop: '1px solid #f0f0f0', marginRight: 20, marginTop: 20 }}>
					{(!communityInfo.isPrivate || communityInfo.memberType !== 'notMember') ? (
						<div>
							<Card title="Members" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								{members.slice(0, 10).map(member => (
									<Row key={member.username}>
										<Col span={24}>
											<Row justify="center">
												<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
											</Row>
											<Row justify="center">
												<span>{member.username}</span>
											</Row>
										</Col>
									</Row>
								))}
								{members.length > 10 && (
									<Row justify="center">
										<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreMembers}>Show More Members</span>
									</Row>
								)}
							</Card>
							<Card title="Moderators" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								{moderators.slice(0, 10).map(moderator => (
									<Row key={moderator.username}>
										<Col span={24}>
											<Row justify="center">
												<Avatar>{moderator.username.charAt(0).toUpperCase()}</Avatar>
											</Row>
											<Row justify="center">
												<span>{moderator.username}</span>
											</Row>
										</Col>
									</Row>
								))}
								{moderators.length > 10 && (
									<Row justify="center">
										<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreModerators}>Show More Moderators</span>
									</Row>
								)}
							</Card>
							<Card title="Owners" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								{owners.slice(0, 10).map(owner => (
									<Row key={owner.username}>
										<Col span={24}>
											<Row justify="center">
												<Avatar>{owner.username.charAt(0).toUpperCase()}</Avatar>
											</Row>
											<Row justify="center">
												<span>{owner.username}</span>
											</Row>
										</Col>
									</Row>
								))}
								{owners.length > 10 && (
									<Row justify="center">
										<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreOwners}>Show More Owners</span>
									</Row>
								)}
							</Card>
						</div>
					) : (
						<div>
							<Card title="Users" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								<Row justify="center">
									<span>You have to be a member to see users.
										You don't have an invitation yet?
										Check your <a href='/invitations' style={{ color: "#7952CC", textDecoration: "none" }}>invitations</a>.
									</span>
								</Row>
							</Card>
						</div>
					)}


				</Sider>
			</Layout>
			<Modal
				title="All Members"
				visible={showMoreMembersModal}
				onCancel={closeModal}
				footer={null}
			>
				<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
					{members.map(member => (
						<Row key={member.username}>
							<Col span={24}>
								<Row justify="center">
									<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{member.username}</span>
								</Row>
							</Col>
						</Row>
					))}
				</div>
			</Modal>
			<Modal
				title="All Moderators"
				visible={showMoreModeratorsModal}
				onCancel={closeModal}
				footer={null}
			>
				<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
					{moderators.map(moderator => (
						<Row key={moderator.username}>
							<Col span={24}>
								<Row justify="center">
									<Avatar>{moderator.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{moderator.username}</span>
								</Row>
							</Col>
						</Row>
					))}
				</div>
			</Modal>
			<Modal
				title="All Owners"
				visible={showMoreOwnersModal}
				onCancel={closeModal}
				footer={null}
			>
				<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
					{owners.map(owner => (
						<Row key={owner.username}>
							<Col span={24}>
								<Row justify="center">
									<Avatar>{owner.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{owner.username}</span>
								</Row>
							</Col>
						</Row>
					))}
				</div>
			</Modal>
		</Layout>
	);
}
