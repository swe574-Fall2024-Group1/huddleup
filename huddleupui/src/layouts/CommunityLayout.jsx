import { Layout, Card, Avatar, Row, Col, Modal, Button, Spin, message, Drawer, Grid } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from "../components/MainLayout/Navbar";
import fetchApi from '../api/fetchApi';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useCommunity from '../components/Community/useCommunity';
import LeftSidebar from '../components/MainLayout/LeftSidebar';
import { LockOutlined, UserOutlined, LoadingOutlined, ContactsFilled } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function CommunityLayout({ children, allowedUserTypes, canNotMembersSee }) {
	const { communityInfo } = useCommunity();
	const [members, setMembers] = useState([]);
	const [bannedMembers, setBannedMembers] = useState([]);
	const [membersLoading, setMembersLoading] = useState(true);
	const [moderators, setModerators] = useState([]);
	const [moderatorsLoading, setModeratorsLoading] = useState(true);
	const [owners, setOwners] = useState([]);
	const [ownersLoading, setOwnersLoading] = useState(true);

	const [showMoreMembersModal, setShowMoreMembersModal] = useState(false);
	const [showMoreModeratorsModal, setShowMoreModeratorsModal] = useState(false);
	const [showMoreOwnersModal, setShowMoreOwnersModal] = useState(false);
	const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);
	const [showModeratorSettingsModal, setShowModeratorSettingsModal] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const [activityFeed, setActivityFeed] = useState([]);
	const [activityLoading, setActivityLoading] = useState(true);

	

	

	const toggleDrawer = () => setDrawerVisible(!drawerVisible);

	const navigate = useNavigate();

	const { communityId } = useParams();

	const activity_feed_result = useApi('/api/communities/get-community-activity-feed', { community_id: communityId });

	if (activity_feed_result.then) {
	    activity_feed_result.then((response) => {
	        if (response && !response.loading && activityLoading) {
	            setActivityFeed(response.data.data);
	            setActivityLoading(false);
	        }
	    });
	}

	const timeAgo = (isoDate) => {
		if (!isoDate) return "Unknown time";
	
		const now = new Date();
		const activityTime = new Date(isoDate);
	
		if (isNaN(activityTime.getTime())) {
			return "Invalid date";
		}
	
		const difference = now - activityTime;
	
		const seconds = Math.floor(difference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
	
		if (seconds < 60) return `${seconds} seconds ago`;
		if (minutes < 60) return `${minutes} minutes ago`;
		if (hours < 24) return `${hours} hours ago`;
		return `${days} days ago`;
	};
	
	
	

	const handleMembershipChange = async () => {
		if (communityInfo.memberType === 'notMember') {
			message.loading('Joining the community...');
			const response = await fetchApi('/api/communities/join-community', { communityId });
			if (response.success) {
				window.location.reload();
			}
		} else {
			message.loading('Leaving the community...');
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
			setOwners(response.data.data);
			setOwnersLoading(false);
		}
	});


	const handleBanUser = async (username, status) => {
		if (status === 'ban') {
			setBannedMembers([...bannedMembers, { username }])
			setMembers(members.filter(member => member.username !== username));
		} else if (status === 'unban') {
			setBannedMembers(bannedMembers.filter(member => member.username !== username));
			setMembers([...members, { username }]);
		}
		await fetchApi('/api/communities/ban-user', { communityId, username });
	};


	const handleShowMoreMembers = () => {
		setShowMoreMembersModal(true);
	};

	const handleShowMoreModerators = () => {
		setShowMoreModeratorsModal(true);
	};

	const handleShowMoreOwners = () => {
		setShowMoreOwnersModal(true);
	};

	const handleShowUserSettings = async () => {
		setShowUserSettingsModal(true);

		const response = await fetchApi('/api/communities/get-community-banned', { communityId });

		if (response.success) {
			setBannedMembers(response.data);
		}

	};

	const handleShowModeratorSettings = async () => {
		setShowModeratorSettingsModal(true);
	};

	const closeModal = () => {
		setShowMoreMembersModal(false);
		setShowMoreModeratorsModal(false);
		setShowMoreOwnersModal(false);
		setShowUserSettingsModal(false);
		setShowModeratorSettingsModal(false);
	};

	const handleMakeModerator = async (username, status) => {
		if (status === 'remove') {
			setModerators(moderators.filter(moderator => moderator.username !== username));
			setMembers([...members, { username }]);
		} else {
			setModerators([...moderators, { username }]);
			setMembers(members.filter(member => member.username !== username));
		}
		await fetchApi('/api/communities/assign-moderator', { communityId, username });
	};

	const handleMakeOwner = async (username) => {
		await fetchApi('/api/communities/change-ownership', { communityId, username });

		navigate(`/communities/${communityId}`);
		window.location.reload();
	};


	if (communityInfo && communityInfo.name && canNotMembersSee && !communityInfo.isPrivate) {
		allowedUserTypes.push('notMember');
	}
	
	const screens = useBreakpoint();
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />
			<Layout>
				<LeftSidebar />
				{communityInfo && !communityInfo.archived ? (
				<Layout style={{ padding: screens.md ? '0 24px 24px' :  '44px 24px 24px' }}>
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
									{communityInfo && !communityInfo.isPrivate && communityInfo.memberType !== 'banned' && (
										<Button
											style={{ backgroundColor: '#7952CC', fontWeight: 700, marginTop: 10 }}
											type="primary"
											onClick={handleMembershipChange}
											disabled={communityInfo.memberType === 'banned' || communityInfo.memberType === 'owner'}
										>
											{communityInfo.memberType === 'notMember' ? 'Join' : 'Leave'}
										</Button>
									)}
									{communityInfo && communityInfo.isPrivate && ['member', 'moderator', 'owner'].includes(communityInfo.memberType) && (
										<Button
											style={{ backgroundColor: '#7952CC', fontWeight: 700, marginTop: 10 }}
											type="primary"
											onClick={handleMembershipChange}
											disabled={communityInfo.memberType === 'banned' || communityInfo.memberType === 'owner'}
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
									<div>
										<Card>
											<p style={{ textAlign: 'center', color: '#626263', fontSize: 20, fontWeight: 500 }}>You have to be a member to see posts of private communities.</p>
											<p style={{ textAlign: 'center', color: '#626263', fontSize: 20, fontWeight: 500 }}>You don't have an invitation yet? Check your <a href='/invitations' style={{ color: "#7952CC", textDecoration: "none" }}>invitations</a>.</p>
										</Card>
									</div>
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
				): (
					<div style={{ textAlign: 'center', margin: 'auto' }}>
						<h1 style={{ color: '#626263', fontSize: 30, fontWeight: 500 }}>This community is archived.</h1>
					</div>
				)}
				{/* Right Bar Begin */}
				<>
				{screens.md ? (
					<Sider width={300} style={{ background: 'transparent', borderTop: '1px solid #f0f0f0', marginRight: 20, marginTop: 20 }}>
						{(communityInfo.memberType && (!communityInfo.isPrivate || communityInfo.memberType !== 'notMember') && communityInfo.memberType !== 'banned') ? (
							<div>

								{/* Community Activity Feed */}
								{/* Community Activity Feed */}
								{/* Community Activity Feed */}
								<Card title="Community Activity Feed"  style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								    {activityLoading ? (
								        <Spin />
								    ) : activityFeed.length > 0 ? (
								        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
								            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
								                {activityFeed.map((activity, index) => (
								                    <li key={index} style={{ marginBottom: 10 }}>
								                        <p>
								                            <b>{activity.user}</b> {activity.action}
								                        </p>
								                        {activity.target && (
								                            <p style={{ fontSize: "smaller", color: "gray" }}>
								                                {Object.entries(activity.target)
								                                    .filter(([key]) => !["postId", "commentId", "templateId", "badgeId"].includes(key)) // Exclude keys
								                                    .map(([key, value]) => (
								                                        <span key={key}>
								                                            {key}: {value}{" "}
								                                        </span>
								                                    ))}
								                            </p>
								                        )}
								                        <p style={{ fontSize: "smaller", color: "gray", marginTop: 5 }}>
								                            {timeAgo(activity.createdAt)} {/* Display time below target */}
								                        </p>
								                    </li>
								                ))}
								            </ul>
								        </div>
								    ) : (
								        <p>No recent activity.</p>
								    )}
								</Card>


								<Card title="Description" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									<span>{communityInfo ? communityInfo.description : ''}</span>
								</Card>

								{/* Members */}
								<Card title="Members" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{members.slice(0, 10).map(member => (
										<Row key={member.username} justify="center">
											<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
											<span>{member.username}</span>
										</Row>
									))}
									{members.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreMembers}>Show More Members</span>
										</Row>
									)}
									{communityInfo.isPrivate && (communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={() => navigate(`/communities/${communityId}/invitations`)}>
											User Invitations
										</Button>
									)}
									{(communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={handleShowUserSettings}>
											User Settings
										</Button>
									)}
								</Card>

								{/* Moderators */}
								<Card title="Moderators" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{moderators.slice(0, 10).map(moderator => (
										<Row key={moderator.username} justify="center">
											<Avatar>{moderator.username.charAt(0).toUpperCase()}</Avatar>
											<span>{moderator.username}</span>
										</Row>
									))}
									{moderators.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreModerators}>Show More Moderators</span>
										</Row>
									)}
									{communityInfo.memberType === 'owner' && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={handleShowModeratorSettings}>
											Moderator Settings
										</Button>
									)}
								</Card>

								{/* Owners */}
								<Card title="Owners" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{owners.slice(0, 10).map(owner => (
										<Row key={owner.username} justify="start" style={{ alignItems:"center" }}>
                                        <Avatar src={owner.profile_picture} style={{ marginRight: "5px" }}/>
											{<Link to={`/users/${owner.user_id}`}>{owner.username}</Link>}
										</Row>
									))}
									{owners.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreOwners}>Show More Owners</span>
										</Row>
									)}
								</Card>

								{/* Moderator Menu */}
								{(communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
									<Card title="Moderator Menu" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white' }} onClick={() => navigate(`/communities/${communityId}/settings`)}>
											Community Settings
										</Button>
									</Card>
								)}
							</div>
						) : (
							<Card title="Users" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
								<Row justify="center">
									<span>
										You have to be a member to see users.
										You don't have an invitation yet?
										Check your <Link to='/invitations' style={{ color: "#7952CC" }}>invitations</Link>.
									</span>
								</Row>
							</Card>
						)}
					</Sider>
					): (
					<>
						<Button onClick={toggleDrawer} style={{ position: 'absolute', right: 10, top: 80, zIndex: 1000 }}>
							<ContactsFilled style={{ fontSize: 21 }} />
						</Button>
						<Drawer
							title="Community Sidebar"
							placement="right"
							onClose={toggleDrawer}
							visible={drawerVisible}
							width={300}
						>
							{(communityInfo.memberType && (!communityInfo.isPrivate || communityInfo.memberType !== 'notMember') && communityInfo.memberType !== 'banned') ? (
								<div>

									{/* Repeating the same structure for mobile */}
									<Card title="Description" style={{ marginBottom: 15 }}>
										<span>{communityInfo ? communityInfo.description : ''}</span>
									</Card>

									<Card title="Members" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{members.slice(0, 10).map(member => (
										<Row key={member.username} justify="center">
											<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
											<span>{member.username}</span>
										</Row>
									))}
									{members.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreMembers}>Show More Members</span>
										</Row>
									)}
									{communityInfo.isPrivate && (communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={() => navigate(`/communities/${communityId}/invitations`)}>
											User Invitations
										</Button>
									)}
									{(communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={handleShowUserSettings}>
											User Settings
										</Button>
									)}
								</Card>

								{/* Moderators */}
								<Card title="Moderators" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{moderators.slice(0, 10).map(moderator => (
										<Row key={moderator.username} justify="center">
											<Avatar>{moderator.username.charAt(0).toUpperCase()}</Avatar>
											<span>{moderator.username}</span>
										</Row>
									))}
									{moderators.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreModerators}>Show More Moderators</span>
										</Row>
									)}
									{communityInfo.memberType === 'owner' && (
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white', marginTop: 10 }} onClick={handleShowModeratorSettings}>
											Moderator Settings
										</Button>
									)}
								</Card>

								{/* Owners */}
								<Card title="Owners" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
									{owners.slice(0, 10).map(owner => (
										<Row key={owner.username} justify="start" style={{ alignItems:"center" }}>
											<Avatar src={owner.profile_picture} style={{ marginRight: "5px" }}/>
											{<Link to={`/users/${owner.user_id}`}>{owner.username}</Link>}
										</Row>
									))}
									{owners.length > 10 && (
										<Row justify="center">
											<span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShowMoreOwners}>Show More Owners</span>
										</Row>
									)}
								</Card>

								{/* Moderator Menu */}
								{(communityInfo.memberType === 'owner' || communityInfo.memberType === 'moderator') && (
									<Card title="Moderator Menu" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", marginBottom: 15 }}>
										<Button style={{ backgroundColor: '#7952CC', fontWeight: 700, color: 'white' }} onClick={() => (toggleDrawer(), navigate(`/communities/${communityId}/settings`))}>
											Community Settings
										</Button>
									</Card>
								)}
								</div>
							) : (
								<Card title="Users" style={{ marginBottom: 15 }}>
									<Row justify="center">
										<span>
											You have to be a member to see users.
											You don't have an invitation yet?
											Check your <Link to='/invitations' style={{ color: "#7952CC" }}>invitations</Link>.
										</span>
									</Row>
								</Card>
							)}
						</Drawer>
					</>
					)}
				</>
				{/* Right Bar End */}
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
				title="User Settings"
				visible={showUserSettingsModal}
				onCancel={closeModal}
				footer={null}
			>
				<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
					{members.map(member => (
						<Row key={member.username}>
							<Col span={8}>
								<Row justify="center">
									<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{member.username}</span>
								</Row>
							</Col>
							<Col span={2}>
								<Button size='small' onClick={() => { handleBanUser(member.username, 'ban') }}> Ban </Button>
							</Col>
							<Col span={6}>
								{communityInfo.memberType === 'owner' ? <Button size='small' onClick={() => { handleMakeModerator(member.username, 'assign') }}> Make Moderator </Button> : ''}
							</Col>
							{communityInfo.memberType === 'owner' ? <Col span={6}>
								<Button size='small' onClick={() => { handleMakeOwner(member.username) }}> Make Owner </Button>
							</Col> : ''}
						</Row>
					))}
					<h4><b>Banned Users</b></h4>
					{bannedMembers && bannedMembers.length > 0 && bannedMembers.map(member => (
						<Row key={member.username}>
							<Col span={12}>
								<Row justify="center">
									<Avatar>{member.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{member.username}</span>
								</Row>
							</Col>
							<Col span={12}>
								<Button onClick={() => { handleBanUser(member.username, 'unban') }}> Unban </Button>
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
				title="Moderator Settings"
				visible={showModeratorSettingsModal}
				onCancel={closeModal}
				footer={null}
			>
				<div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
					{moderators.map(moderator => (
						<Row key={moderator.username}>
							<Col span={12}>
								<Row justify="center">
									<Avatar>{moderator.username.charAt(0).toUpperCase()}</Avatar>
								</Row>
								<Row justify="center">
									<span>{moderator.username}</span>
								</Row>
							</Col>
							<Col span={12}>
								<Button onClick={() => { handleMakeModerator(moderator.username, 'remove') }}> Remove Moderator </Button>
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
