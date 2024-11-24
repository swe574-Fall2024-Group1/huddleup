import React, { useState, Component } from 'react';
import { UploadOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Select, Upload, message, Typography, Card, Row, Col, Collapse } from 'antd';
import fetchApi from '../../api/fetchApi';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;
const { Panel } = Collapse;

class CreateBadge extends Component {
  state = {
    visible: false,
    badgeName: '',
    badgeType: '',
    badgeDescription: '',
    badgeImage: null,
    criteria: {},
    communityId: this.props.communityInfo?.id,
    templateCount: '',
    postCount: '',
    commentCount: '',
    followerCount: '',
    likeCount: '',
    showAutomaticFields: false,
    editingBadge: null,
    editingCriteria: {},
    editingTitle: '',
    editingDescription: ''
  };

  handleIconUpload = (event) => {
    const reader = new FileReader();
    const file = event.file;
    reader.onloadend = () => {
      this.setState({ badgeImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleBadgeTypeChange = (value) => {
    this.setState({ badgeType: value, showAutomaticFields: value === 'automatic' });
  };

  handleSubmit = async () => {
    const { badgeName, badgeType, badgeDescription, criteria, badgeImage, communityId, templateCount, postCount, followerCount, likeCount, commentCount } = this.state;

    if (templateCount) criteria.template_count = parseInt(templateCount, 10) || '';
    if (postCount) criteria.post_count = parseInt(postCount, 10) || '';
    if (followerCount) criteria.follower_count = parseInt(followerCount, 10) || '';
    if (likeCount) criteria.like_count = parseInt(likeCount, 10) || '';
    if (commentCount) criteria.comment_count = parseInt(commentCount, 10) || '';

    const values = {
      name: badgeName,
      type: badgeType,
      description: badgeDescription,
      image: badgeImage,
      criteria,
      communityId
    };

    try {
      const response = await fetchApi('/api/communities/badges/create-badge', values, 'POST');
      if (response?.success) {
        message.success('Badge created successfully');
        this.setState({ visible: false });

        // Revalidate community data
        const communityResponse = await fetchApi('/api/communities/get-community-info', { communityId }, 'POST');
        if (communityResponse?.success) {
          message.success('Community data revalidated successfully');
        } else {
          message.error('Failed to revalidate community data');
        }
      } else {
        message.error('Failed to create badge');
      }
    } catch (error) {
      message.error('Failed to create badge');
      console.log(values, error);
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.handleSubmit();
  };

  handleCancel = () => {
    this.setState({ visible: false, editingBadge: null });
  };

  handleUpdateBadge = (badge) => {
    this.setState({
      editingBadge: badge,
      badgeName: badge.name,
      badgeType: badge.type,
      badgeDescription: badge.description,
      badgeImage: badge.image,
      templateCount: badge.criteria?.template_count || '',
      postCount: badge.criteria?.post_count || '',
      followerCount: badge.criteria?.follower_count || '',
      likeCount: badge.criteria?.like_count || '',
      commentCount: badge.criteria?.comment_count || '',
      showAutomaticFields: badge.type === 'automatic',
      editingCriteria: badge.criteria || {},
      editingTitle: badge.name,
      editingDescription: badge.description
    });
  };

  handleRemoveBadge = async (badgeId) => {
    try {
      const response = await fetchApi('/api/communities/badges/delete-badge', { badgeId }, 'DELETE');
      if (response?.success) {
        message.success('Badge removed successfully');
        // Revalidate community data
        const communityId = this.state.communityId;
        const communityResponse = await fetchApi('/api/communities/get-community-info', { communityId }, 'POST');
        if (communityResponse?.success) {
          message.success('Community data revalidated successfully');
        } else {
          message.error('Failed to revalidate community data');
        }
      } else {
        message.error('Failed to remove badge');
      }
    } catch (error) {
      message.error('Failed to remove badge');
      console.log(error);
    }
  };

  handleCriteriaChange = (key, value) => {
    this.setState((prevState) => ({
      editingCriteria: {
        ...prevState.editingCriteria,
        [key]: parseInt(value, 10) || ''
      }
    }));
  };

  handleSaveCriteria = async () => {
    const { editingBadge, editingCriteria, editingTitle, editingDescription } = this.state;
    const updatedBadge = {
      ...editingBadge,
      communityId: this.state.communityId,
      badgeId: editingBadge.id,
      criteria: editingCriteria,
      name: editingTitle,
      description: editingDescription
    };

    try {
      const response = await fetchApi('/api/communities/badges/update-badge', updatedBadge, 'PUT');
      if (response?.success) {
        message.success('Badge updated successfully');
        this.setState({ editingBadge: null, editingCriteria: {}, editingTitle: '', editingDescription: '' });

        // Revalidate community data
        const communityId = this.state.communityId;
        const communityResponse = await fetchApi('/api/communities/get-community-info', { communityId }, 'POST');
        if (communityResponse?.success) {
          message.success('Community data revalidated successfully');
        } else {
          message.error('Failed to revalidate community data');
        }
      } else {
        message.error('Failed to update badge');
      }
    } catch (error) {
      message.error('Failed to update badge');
      console.log(error);
    }
  };

  render() {
    const { badges } = this.props;
    const { visible, badgeName, badgeType, badgeDescription, templateCount, postCount, followerCount, likeCount, commentCount, showAutomaticFields, editingBadge, editingCriteria, editingTitle, editingDescription } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Badge
        </Button>
        <Modal
          title={editingBadge ? "Update Badge" : "Create Badge"}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Badge Name">
              <Input
                value={badgeName}
                onChange={(e) => this.setState({ badgeName: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Badge Type">
              <Select
                value={badgeType}
                onChange={this.handleBadgeTypeChange}
                disabled={!!editingBadge}
              >
                <Option value="manual">Manual</Option>
                <Option value="automatic">Automatic</Option>
              </Select>
            </Form.Item>
            {showAutomaticFields && (
              <>
                <Form.Item label="Template Count">
                  <Input
                    value={templateCount}
                    onChange={(e) => this.setState({ templateCount: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Post Count">
                  <Input
                    value={postCount}
                    onChange={(e) => this.setState({ postCount: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Follower Count">
                  <Input
                    value={followerCount}
                    onChange={(e) => this.setState({ followerCount: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Comment Count">
                    <Input
                        value={commentCount}
                        onChange={(e) => this.setState({ commentCount: e.target.value })}
                    />
                </Form.Item>
                <Form.Item label="Like Count">
                  <Input
                    value={likeCount}
                    onChange={(e) => this.setState({ likeCount: e.target.value })}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item label="Badge Description">
              <TextArea
                value={badgeDescription}
                onChange={(e) => this.setState({ badgeDescription: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Badge Image">
              <Upload
                beforeUpload={() => false}
                onChange={this.handleIconUpload}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
          <div>
            <Title level={4}>Existing Badges</Title>
            <Collapse>
              {badges.map((badge) => (
                <Panel header={
                  <Row>
                    <Col span={20}>
                      <img src={badge.image ?? 'https://static.thenounproject.com/png/1269202-200.png'} style={{maxWidth: 20}}/>
                      <span style={{marginLeft: 10}}>{badge.name}</span>
                    </Col>
                  </Row>
                } key={badge.id}>
                  <Card
                    actions={[
                      <Button icon={<EditOutlined />} onClick={() => this.handleUpdateBadge(badge)}>Update</Button>,
                      <Button icon={<DeleteOutlined />} onClick={() => this.handleRemoveBadge(badge.id)}>Remove</Button>,
                      editingBadge && editingBadge.id === badge.id && (
                        <Button icon={<SaveOutlined />} onClick={this.handleSaveCriteria}>Save</Button>
                      )
                    ]}
                  >
                    {editingBadge && editingBadge.id === badge.id ? (
                      <>
                        <Form.Item label="Badge Title">
                          <Input
                            value={editingTitle}
                            onChange={(e) => this.setState({ editingTitle: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Badge Description">
                          <TextArea
                            value={editingDescription}
                            onChange={(e) => this.setState({ editingDescription: e.target.value })}
                          />
                        </Form.Item>
                        {badge.type === 'automatic' && (
                          <>
                            <Form.Item label="Template Count">
                              <Input
                                value={editingCriteria.template_count}
                                onChange={(e) => this.handleCriteriaChange('template_count', e.target.value)}
                              />
                            </Form.Item>
                            <Form.Item label="Post Count">
                              <Input
                                value={editingCriteria.post_count}
                                onChange={(e) => this.handleCriteriaChange('post_count', e.target.value)}
                              />
                            </Form.Item>
                            <Form.Item label="Follower Count">
                              <Input
                                value={editingCriteria.follower_count}
                                onChange={(e) => this.handleCriteriaChange('follower_count', e.target.value)}
                              />
                            </Form.Item>
                            <Form.Item label="Comment Count">
                              <Input
                                value={editingCriteria.comment_count}
                                onChange={(e) => this.handleCriteriaChange('comment_count', e.target.value)}
                              />
                            </Form.Item>
                            <Form.Item label="Like Count">
                              <Input
                                value={editingCriteria.like_count}
                                onChange={(e) => this.handleCriteriaChange('like_count', e.target.value)}
                              />
                            </Form.Item>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Card.Meta title={badge.name} description={badge.description} />
                        {badge.type === 'automatic' && (
                          <div>
                            <p>Template Count: {badge.criteria.template_count}</p>
                            <p>Post Count: {badge.criteria.post_count}</p>
                            <p>Follower Count: {badge.criteria.follower_count}</p>
                            <p>Comment Count: {badge.criteria.comment_count}</p>
                            <p>Like Count: {badge.criteria.like_count}</p>
                          </div>
                        )}
                      </>
                    )}
                  </Card>
                </Panel>
              ))}
            </Collapse>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateBadge;