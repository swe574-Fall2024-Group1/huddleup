import { useState } from 'react';
import { TeamOutlined, PlusOutlined, UsergroupAddOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Avatar, Card, Button, Modal, Row, Col } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import useApi from '../../hooks/useApi';
import "../../assets/main-layout.css"
import useAuth from '../../components/Auth/useAuth';

const { Sider } = Layout;

const RightSidebar = () => {

	const [connections, setConnections] = useState([]);
	const [connectionsLoading, setConnectionsLoading] = useState(true);

	const [ownedCommunities, setOwnedCommunities] = useState([]);
	const [ownedCommunitiesLoading, setOwnedCommunitiesLoading] = useState(true);

	const connections_result = useApi('/api/communities/get-user-connections', {});

	connections_result.then((response) => {
		if (response && !response.loading && connectionsLoading) {
			setConnections(response.data.data.following);
			setConnectionsLoading(false);
		}
	});

	const owned_communities_result = useApi('/api/communities/get-owned-communities', {});

	owned_communities_result.then((response) => {
		if (response && !response.loading && ownedCommunitiesLoading) {
			setOwnedCommunities(response.data.data);
			setOwnedCommunitiesLoading(false);
		}
	});


	// State to manage modal visibility for owned communities
	const [ownedCommunitiesModalVisible, setOwnedCommunitiesModalVisible] = useState(false);

	// State to manage modal visibility for connections
	const [connectionsModalVisible, setConnectionsModalVisible] = useState(false);

	// Function to toggle modal visibility for owned communities
	const toggleOwnedCommunitiesModal = () => {
		setOwnedCommunitiesModalVisible(!ownedCommunitiesModalVisible);
	};

	// Function to toggle modal visibility for connections
	const toggleConnectionsModal = () => {
		setConnectionsModalVisible(!connectionsModalVisible);
	};

	console.log(ownedCommunities)
	return (
		<Sider width={300} style={{ background: 'transparent', borderTop: '1px solid #f0f0f0', marginRight: 20, marginTop: 20 }}>
			<Card title="Owned Communities" bordered={false}>
				<Row gutter={[20, 20]}>
					{ownedCommunities.map(community => (
						<Link to={`/communities/${community.id}`} key={community.id} style={{}}>
							<Col span={30} key={community.id} justify="center" >
								<Row justify="center" >
									<Avatar src={`${community.mainImage}`} size={35} />
								</Row>
								<Row justify="center" style={{ textAlign: 'center', color: 'black',  textDecoration:'none !important' }}>
									<span>{community.name}</span>
								</Row>
							</Col>
						</Link>
					))}
				</Row>
				{ownedCommunities.length > 10 && (
					<Button type="link" onClick={toggleOwnedCommunitiesModal}>
						See all owned communities
					</Button>
				)}
			</Card>
			<Card title="Connections" style={{ marginTop: 16 }} bordered={false}>
				<Row gutter={[16, 16]}>
					{connections.map(connection => (
						<Col span={10} key={connection.id}>
							<Row justify="center">
								<Avatar >{connection.username.charAt(0).toUpperCase()}</Avatar>
							</Row>
							<Row justify="center">
								<span>{connection.username}</span>
							</Row>
						</Col>
					))}
				</Row>
				{connections.length > 10 && (
					<Button type="link" onClick={toggleConnectionsModal}>
						See all connections
					</Button>
				)}
			</Card>
			<Modal
				title="All Owned Communities"
				visible={ownedCommunitiesModalVisible}
				onCancel={toggleOwnedCommunitiesModal}
				footer={null}
			>
				<div>
					{ownedCommunities.map(community => (
						<div key={community.id}>
							<Avatar src={`${community.mainImage}`} size="small" style={{ marginRight: 8 }} />
							<span>{community.name}</span>
						</div>
					))}
				</div>
			</Modal>
			<Modal
				title="All Connections"
				visible={connectionsModalVisible}
				onCancel={toggleConnectionsModal}
				footer={null}
			>
				<div>
					{connections.map(connection => (
						<div key={connection.id}>
							<Avatar size="small" style={{ marginRight: 8 }} >{connection.username.charAt(0).toUpperCase()}</Avatar>
							<span>{connection.username}</span>
						</div>
					))}
				</div>
			</Modal>
		</Sider>

	);
};

export default RightSidebar