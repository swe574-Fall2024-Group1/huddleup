import {  useState } from 'react';
import { List, Button, Card, Avatar } from 'antd';
import useApi from '../hooks/useApi';
import fetchApi from '../api/fetchApi';

const Connections = () => {
	const [connections, setConnections] = useState([]);
	const [connectionsLoading, setConnectionsLoading] = useState(true);

	const connections_result = useApi('/api/communities/get-user-connections', {});

	connections_result.then((response) => {
		if (response && !response.loading && connectionsLoading) {
			setConnections(response.data.data);
			console.log(response.data.data)
			setConnectionsLoading(false);
		}
	});

	const handleUnfollowUser = async (username) => {
		await fetchApi('/api/communities/follow-user', { username });

		setConnections(prev => ({
			...prev,
			following: prev.following.filter(user => user.username !== username)
		}));
	};

	const getInitials = (name) => name[0].toUpperCase();  // Function to get first letter of username

	return (
		<div style={{ padding: '20px' }}>
			<h2 style={{ color: '#5c5b5b', marginBottom: '20px' }}>
				Connections
			</h2>
			<Card title="Following" style={{ marginBottom: '20px' }}>
				<List
					itemLayout="horizontal"
					dataSource={connections.following}
					renderItem={user => (
						<List.Item actions={[<Button onClick={() => handleUnfollowUser(user.username)}>{'Unfollow'}</Button>]}>
							<List.Item.Meta
								avatar={<Avatar>{getInitials(user.username)}</Avatar>}  // Add Avatar with first letter of username
								title={user.username}
							/>
						</List.Item>
					)}
				/>
			</Card>
			<Card title="Followers">
				<List
					itemLayout="horizontal"
					dataSource={connections.followers}
					renderItem={user => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar>{getInitials(user.username)}</Avatar>}  // Add Avatar with first letter of username
								title={user.username}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</div>
	);
};

export default Connections;
