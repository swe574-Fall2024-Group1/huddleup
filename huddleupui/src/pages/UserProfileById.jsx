import React, { useState, useEffect } from 'react';
import { Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useParams} from "react-router-dom";

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

      <div style={{ marginBottom: "20px" }}>
        <h4>Tags of Interest</h4>
        <div>
          {tags.length > 0 ? tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          )) : <p>No tags added</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfileById;