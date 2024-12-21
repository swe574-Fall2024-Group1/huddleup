import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Tag, AutoComplete, DatePicker, message, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`/api/auth/get-user-info/`);
        const { username, about_me, tags, id, name, surname, birthday, profile_picture } = response.data.data;
        setAboutMe(about_me);
        setTags(tags);
        setUserId(id);
        setName(name);
        setSurname(surname);
        setBirthday(birthday ? birthday : null);
        setProfilePicture(profile_picture);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const [userId, setUserId] = useState(null);

  const handleImageChange = (info) => {
    if (info.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(info.file);
    }
  };

  const fetchTags = async (query) => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(`/api/communities/tags?search=${query}`);
        setSuggestedTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    } else {
      setSuggestedTags([]);
    }
  };

  const debouncedFetchTags = useCallback(debounce(fetchTags, 300), []);

  useEffect(() => {
    debouncedFetchTags(tagInput);
  }, [tagInput, debouncedFetchTags]);

  const handleTagRemove = (removedTag) => {
    setTags(tags.filter(tag => tag.id !== removedTag));
  };

  const handleAddTag = (value, option) => {
    console.log(option);
    // Find the selected tag using the unique `id`
    const selectedTag = suggestedTags.find((item) => item.id === option.key);

    // Prevent duplicates
    if (selectedTag && !tags.find((tag) => tag.id === selectedTag.id)) {
      setTags([...tags, selectedTag]);
    }

    setTagInput(""); // Clear input after selection
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        about_me: aboutMe,
        tags,
        name,
        surname,
        birthday: birthday ? birthday : null,
        profile_picture: profilePicture,
      };

      const response = await axios.post(`/api/communities/update-user-profile`, payload);

      if (response.data.success) {
        navigate(`/users/${userId}`);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      message.error("Error saving profile. Please try again later.");
    }
  };

  return (
      <div style={{
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
      }}>
        <h2 style={{marginTop: 0}}>Edit Profile: {username}</h2>
        <div style={{textAlign: 'center', marginBottom: 20}}>
          <Upload
              name="profilePicture"
              listType="picture"
              showUploadList={false}
              customRequest={({file, onSuccess}) => {
                setTimeout(() => onSuccess("ok"), 0);
                handleImageChange({file});
              }}
          >
            <Avatar
                size={100}
                icon={!profilePicture ? <UserOutlined/> : null}
                src={profilePicture}
                style={{cursor: 'pointer'}}
            />
          </Upload>
        </div>

        <div style={{marginBottom: "20px"}}>
          <h4>Name</h4>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
        </div>

        <div style={{marginBottom: "20px"}}>
          <h4>Surname</h4>
          <Input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Enter your surname"/>
        </div>

        <div style={{marginBottom: "20px"}}>
          <h4>Birthday</h4>
          <input
              type="date"
              value={birthday ? birthday : ''}
              onChange={(e) => setBirthday(e.target.value)}
              style={{width: '100%'}}
          />
        </div>

        <div style={{marginBottom: "20px"}}>
          <h4>About Me</h4>
          <Input.TextArea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
          />
        </div>

      <div style={{ marginBottom: "20px" }}>
        <h4>Tags of Interest</h4>
        <AutoComplete
          style={{ width: "100%", marginBottom: "10px" }}
          options={suggestedTags.map((item) => ({
								  value: item.id.toString(),
								  label: (
									<div>
									  <strong>{item.name}</strong>
									  <p style={{ margin: 0 }}>{item.description}</p>
									</div>
								  ),
								  key: item.id,
								}))}
          value={tagInput}
          onSearch={(value) => setTagInput(value)}
          onSelect={handleAddTag}
          placeholder="Add a tag"
        />

        <div>
          {tags.map(tag => (
            <Tag
              key={tag.id}
              closable
              onClose={() => handleTagRemove(tag.id)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>

        <Button type="primary" onClick={handleSaveProfile}
                style={{backgroundColor: '#7952CC', fontWeight: 700, color: '#fff'}}>
          Save Profile
        </Button>
      </div>
  );
};

export default UserProfile;
