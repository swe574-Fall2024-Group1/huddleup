import React, { useState } from 'react';
import { Card, Avatar, Tag, List, Tooltip, Spin, Button, message } from 'antd';
import useApi from '../hooks/useApi';
import fetchApi from '../api/fetchApi';
import { useParams } from 'react-router-dom';
import { TrophyOutlined } from '@ant-design/icons';

const UserProfile = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [profileLoading, setProfileLoading] = useState(true);
	const [isFollowing, setIsFollowing] = useState(false);
	const { userId } = useParams();

	const user_profile_result = useApi('/api/communities/get-user-profile', { userId });

	user_profile_result.then((response) => {
		if (response && !response.loading && profileLoading) {
			const userInfo = response.data.data;
			setUserInfo(userInfo);
			setProfileLoading(false);
			setIsFollowing(userInfo.isFollowing);
		}
	});

	const handleFollow = async (username, isFollowing) => {
		try {
			// Call the API
			await fetchApi('/api/communities/follow-user', { username });
			setIsFollowing(!isFollowing);
			message.success(`${isFollowing ? 'Unfollowed' : 'Followed'} ${username}`);
		} catch (error) {
			message.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'} ${username}`);
		}
	};

	if (profileLoading) {
		return (
			<div style={{ textAlign: 'center', marginTop: 50 }}>
				<Spin size="large" />
			</div>
		);
	}

	if (!userInfo) {
		return <div>No user information found.</div>;
	}

	const { username, about_me, tags, badges } = userInfo;

	console.log(userInfo)


	return (
		<div style={{ maxWidth: 800, margin: '50px auto', padding: '20px' }}>
			<Card title={`Profile: ${username}`} bordered>
				<Button type="primary" onClick={() => handleFollow(userInfo.username, userInfo.isFollowing)}>
					{isFollowing ? 'Unfollow' : 'Follow'}
				</Button>
				<p><strong>About Me:</strong> {about_me}</p>

				<p><strong>Tags:</strong> {tags.length > 0 ? tags.map(tag => <Tag key={tag}>{tag}</Tag>) : 'No tags'}</p>

				<div style={{ marginTop: 20 }}>
					<strong>Badges:</strong>
					{badges.length > 0 ? (
						<List
							grid={{ gutter: 16, column: 3 }}
							dataSource={badges}
							renderItem={({ badge }) => (
								<List.Item>
									<Tooltip title={badge.description}>
										<Card
											hoverable
											cover={badge.image ? <Avatar src={badge.image} size={64} style={{ margin: '10px auto', borderRadius: '50%' }} /> : <TrophyOutlined style={{ fontSize: '64px', margin: '10px auto' }} />}
										>
											<Card.Meta title={badge.name} description={`Type: ${badge.type}`} />
											<p>{badge.description}</p>
											<p>Earned in <span style={{ color: '#7952CC' }}>{badge.community}</span> community</p>
										</Card>
									</Tooltip>
								</List.Item>
							)}
						/>
					) : (
						<p>No badges assigned.</p>
					)}
				</div>

				<div style={{ marginTop: 20 }}>
					<strong>Communities:</strong>
					{userInfo.communities.length > 0 ? (
						<List
							grid={{ gutter: 16, column: 3 }}
							dataSource={userInfo.communities}
							renderItem={(community) => (
								<List.Item>
									<Card
										hoverable
										onClick={() => window.location.href = `/communities/${community.id}`}
										cover={<Avatar src={community.mainImage} size={64} style={{ margin: '10px auto' }} />}
									>
										<Card.Meta title={community.name} description={community.description} />
									</Card>
								</List.Item>
							)}
						/>
					) : (
						<p>No communities joined.</p>
					)}
				</div>
			</Card>
		</div>
	);
};

export default UserProfile;