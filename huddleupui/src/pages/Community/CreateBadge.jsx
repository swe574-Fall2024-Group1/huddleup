import React, { useState, Component } from 'react';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, Select, Upload, message, Typography } from 'antd';
import fetchApi from '../../api/fetchApi';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

class CreateBadge extends Component {
  state = {
    visible: false,
    badgeName: '',
    badgeType: '',
    badgeDescription: '',
    badgeImage: null,
    criteria: {},
  };


  handleIconUpload = (event) => {
    const reader = new FileReader();
    const file = event.file;
    reader.onloadend = () => {
      this.setState({ badgeImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = async () => {
    const { badgeName, badgeType, badgeDescription, badgeImage, criteria } = this.state;
    const values = {
        name: badgeName,
        type: badgeType,
        description: badgeDescription,
        image: badgeImage,
        criteria,
    };

    console.log(this.state)
    try {
      const response = await fetchApi('/api/communities/badges/create-badge', values, 'POST');
      if (response?.success) {
        message.success('Badge created successfully');
        this.setState({ visible: false });
      } else {
        message.error('Failed to create badge');
      }
    } catch (error) {
      message.error('Failed to create badge');
      console.log(values, error)
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    this.handleSubmit();
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { badges } = this.props;
    const { visible, badgeName, badgeType, badgeDescription } = this.state;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Badge
        </Button>
        <Modal
          title="Create Badge"
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
                onChange={(value) => this.setState({ badgeType: value })}
              >
                <Option value="manual">Manual</Option>
                <Option value="automatic">Automatic</Option>
              </Select>
            </Form.Item>
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
            {badges.map((badge) => (
              <div key={badge.id}>
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default CreateBadge;