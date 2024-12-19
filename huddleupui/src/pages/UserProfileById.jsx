import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tag, List, Tooltip, Spin, Button, message } from 'antd';
import { UserOutlined, TrophyOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import fetchApi from '../api/fetchApi';
import useApi from '../hooks/useApi';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();

  // Fetching user profile with custom hook
  const user_profile_result = useApi('/api/communities/get-user-profile', { userId });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user data using axios
        const response = await axios.post(`/api/communities/get-user-profile`, { userId });
        const { username, about_me, tags, name, surname, birthday, profile_picture, badges, communities } = response.data.data;
        setUserInfo({
          username, about_me, tags, name, surname, birthday, profile_picture, badges, communities
        });
        setIsFollowing(response.data.data.isFollowing);
        setProfileLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleFollow = async (username, isFollowing) => {
    try {
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

  const { username, about_me, tags, badges, communities, name, surname, birthday, profile_picture } = userInfo;

  return (
    <div style={{ maxWidth: 800, margin: '50px auto', padding: '20px' }}>
      <Card title={`Profile: ${username}`} bordered>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Avatar size={100} icon={!profile_picture ? <UserOutlined /> : null} src={profile_picture} alt="Profile Picture" />
        </div>
        <Button type="primary" onClick={() => handleFollow(username, isFollowing)}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
        <p><strong>Name:</strong> {name || "Not provided"}</p>
        <p><strong>Surname:</strong> {surname || "Not provided"}</p>
        <p><strong>Birthday:</strong> {birthday || "Not provided"}</p>
        <p><strong>About Me:</strong> {about_me || "Not provided"}</p>

        <div style={{ marginBottom: '20px' }}>
          <strong>Tags:</strong>
          {tags.length > 0 ? tags.map(tag => <Tag key={tag}>{tag}</Tag>) : 'No tags'}
        </div>

        <div style={{ marginTop: 20 }}>
          <strong>Badges:</strong>
          {badges.length > 0 ? (
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={badges}
              renderItem={({ badge }) => (
                <List.Item>
                  <Tooltip title={badge.description}>
                    <Card hoverable cover={badge.image ? <Avatar src={badge.image} size={64} style={{ margin: '10px auto', borderRadius: '50%' }} /> : <TrophyOutlined style={{ fontSize: '64px', margin: '10px auto' }} />}>
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
          {communities.length > 0 ? (
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={communities}
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
