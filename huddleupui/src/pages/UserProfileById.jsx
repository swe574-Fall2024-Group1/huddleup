import React, { useState, useEffect } from 'react';
import { Card, Avatar, Tag, List, Tooltip, Spin, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useParams} from "react-router-dom";
import useApi from '../hooks/useApi';
import fetchApi from '../api/fetchApi';
import { TrophyOutlined } from '@ant-design/icons';

const UserProfileById = ({  }) => {
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`/api/communities/get-user-profile`, { userId });
        const { username, about_me, tags, name, surname, birthday, profile_picture } = response.data.data;
        setUsername(username);
        setAboutMe(about_me);
        setTags(tags.map(tag => tag.toLowerCase()));
        setName(name);
        setSurname(surname);
        setBirthday(birthday || null);
        setProfilePicture(profile_picture);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div style={{
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
    }}>
      <h2 style={{ marginTop: 0 }}>User Profile: {username}</h2>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Avatar
          size={100}
          icon={!profilePicture ? <UserOutlined /> : null}
          src={profilePicture}
          alt="Profile Picture"
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Name</h4>
        <p>{name || "Not provided"}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Surname</h4>
        <p>{surname || "Not provided"}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Birthday</h4>
        <p>{birthday || "Not provided"}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>About Me</h4>
        <p>{aboutMe || "Not provided"}</p>
      </div>

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

export default UserProfileById;