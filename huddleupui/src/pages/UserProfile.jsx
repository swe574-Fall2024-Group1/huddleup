import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Tag, AutoComplete } from 'antd';
import axios from 'axios';
import debounce from 'lodash/debounce';

const UserProfile = () => {
  const [about_me, setAboutMe] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`/api/auth/get-user-info`);
        const { about_me: userAboutMe, tags: userTags } = response.data.data;
        setAboutMe(userAboutMe);
        setTags(userTags.map(tag => tag.toLowerCase())); // Initialize tags in lowercase
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch tags for autocomplete suggestions from backend
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
    const lowerCaseTag = tag.toLowerCase();
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
      await axios.put(`/api/auth/profile`, { about_me, tags });
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div style={{marginTop: 10, marginBottom: 10, backgroundColor: 'white', padding: 20, borderRadius: 10, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
      <h2 style={{marginTop: 0}}>User Profile</h2>

      <div style={{ marginBottom: "20px" }}>
        <h4>About Me</h4>
        <Input.TextArea
          value={about_me}
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

      <Button type="primary" onClick={handleSaveProfile} style={{ backgroundColor: '#7952CC', fontWeight: 700 }}>
        Save Profile
      </Button>
    </div>
  );
};

export default UserProfile;
