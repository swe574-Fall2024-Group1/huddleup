import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Tag, AutoComplete, DatePicker, message, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import debounce from 'lodash/debounce';

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`/api/auth/get-user-info/`);
        const { username, about_me, tags, name, surname, birthday, profile_picture } = response.data.data;
        setAboutMe(about_me);
        setTags(tags.map(tag => tag.toLowerCase()));
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

  const handleImageChange = (info) => {
    if (info.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(reader.result);
      };
        reader.readAsDataURL(info.file)
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

  const handleAddTag = (tag) => {
    const lowerCaseTag = tag.toLowerCase().trim();
    if (lowerCaseTag.length >= 3 && !tags.includes(lowerCaseTag)) {
      setTags([...tags, lowerCaseTag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  const handleTagRemove = (removedTag) => {
    setTags(tags.filter(tag => tag !== removedTag));
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
        message.success("Profile saved successfully!");
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
          style={{ width: 200, marginBottom: "10px" }}
          options={suggestedTags
            .filter(tag => !tags.includes(tag))
            .map(tag => ({ value: tag }))}
          value={tagInput}
          onChange={(value) => setTagInput(value.toLowerCase())}
          onSelect={handleAddTag}
          placeholder="Add a tag"
          onBlur={() => handleAddTag(tagInput)}
        />

        <div>
          {tags.map(tag => (
            <Tag
              key={tag}
              closable
              onClose={() => handleTagRemove(tag)}
            >
              {tag}
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
