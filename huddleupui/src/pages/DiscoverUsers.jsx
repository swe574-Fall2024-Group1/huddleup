import React, { useState } from 'react';
import { Card, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import fetchApi from '../api/fetchApi';

const { Meta } = Card;

const DiscoverUsers = () => {
	const [users, setUsers] = useState([]);
	const [usersLoading, setUsersLoading] = useState(true);

	// Call the API to fetch recommended users
	const users_result = useApi('/api/communities/get-recommended-users', {});

	users_result.then((response) => {
		if (response && !response.loading && usersLoading) {
			setUsers(response.data.data);
			setUsersLoading(false);
		}
	});

	// Follow/Unfollow logic
	const handleFollowUser = async (username, isFollowing) => {
		try {
			// Optimistic UI update
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.username === username ? { ...user, isFollowing: !isFollowing } : user
				)
			);

			// Call the API
			await fetchApi('/api/communities/follow-user', { username });

			message.success(`${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`);
		} catch (error) {
			// Revert UI update on error
			setUsers((prevUsers) =>
				prevUsers.map((user) =>
					user.username === username ? { ...user, isFollowing } : user
				)
			);

			message.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'} ${username}`);
		}
	};

	return (
		<div>
			<h2 style={{ color: '#5c5b5b' }}>
				Recommended Users {users && users.length > 0 ? `(${users.length})` : '(0)'}
			</h2>

			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{users &&
					users.map((user) => (
						<Card
							key={user.id}
							style={{
								width: 350,
								marginBottom: 20,
								marginRight: 20,
								boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
							}}
							actions={[
								<Button
									style={{
										borderColor: '#7952CC',
										color: user.isFollowing ? '#ff4d4f' : '#7952CC',
										fontWeight: 800,
									}}
									size="middle"
									onClick={() =>
										handleFollowUser(user.username, user.isFollowing)
									}
								>
									{user.isFollowing ? 'Unfollow' : 'Follow'}
								</Button>,
							]}
						>
							<div
								style={{
									width: 80,
									height: 80,
									borderRadius: '50%',
									margin: '0 auto 10px',
									overflow: 'hidden',
								}}
							>
								<img
									alt={user.username}
									src={user.profile_pic || 'https://via.placeholder.com/80'} // Default profile image
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									}}
								/>
							</div>
							<Meta
								title={
									<Link to={`/users/${user.id}`}>
										{user.username}
									</Link>
								}
							/>
						</Card>
					))}
			</div>

			{users && users.length === 0 && (
				<Card
					style={{
						marginBottom: 20,
						marginRight: 20,
						boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
					}}
				>
					<div
						style={{
							color: '#5c5b5b',
							marginTop: 20,
							fontSize: 15,
							fontWeight: 600,
						}}
					>
						No recommended users at the moment.
					</div>
				</Card>
			)}
		</div>
	);
};

export default DiscoverUsers;
