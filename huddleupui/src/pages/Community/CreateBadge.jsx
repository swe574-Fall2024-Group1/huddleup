import React, { Component } from 'react';
import ReactDOM from 'react';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Button, Select, Upload, message, Typography } from 'antd'

const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

class CreateBadge extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      badgeName: '',
      description: '',
      criteria: '',
      icon: null,
    }
  }

  handleIconUpload = (event) => {
    console.log(event);
    if (event.file && event.fileList[0]) {
      this.setState({ icon: event.fileList[0].thumbUrl })
    }
  }

  handleSubmit = (event) => {
    
    const { badgeName, description, criteria, icon } = this.state
    // Handle form submission logic here
    console.log({ badgeName, description, criteria, icon })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    this.handleSubmit();
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading, badgeName, description, criteria, icon } = this.state;
    return (
      <div>
        <Button type="primary"
					size="large"
					style={{ backgroundColor: '#7952CC', fontWeight: 700 }} onClick={this.showModal}>
          Create Badge
        </Button>
        <Modal
          visible={visible}
          title="Create Badge"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} style={{ backgroundColor: '#7952CC' }}>
              Create
            </Button>,
          ]}
        >
          <div className="container mx-auto p-8">
            <Form
            layout="vertical"
            onFinish={this.handleSubmit}
            className="bg-white shadow-md rounded-lg p-6"
            >
            <Form.Item
                label="Badge Name"
                name="badgeName"
                rules={[{ required: true, message: 'Please enter the badge name' }]}
            >
                <Input
                placeholder="Creative Genius"
                value={badgeName}
                onChange={(e) => this.setState({ badgeName: e.target.value })}
                />
            </Form.Item>
            
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter a description' }]}
            >
                <TextArea
                placeholder="Enter badge description"
                value={description}
                rows={3}
                onChange={(e) => this.setState({ description: e.target.value })}
                />
            </Form.Item>

            <Form.Item label="Badge Icon" name="icon">
                <Upload
                name="icon"
                listType="picture"
                beforeUpload={() => false} // Prevent auto-upload
                onChange={this.handleIconUpload}
                accept="image/*"
                >
                <Button icon={<UploadOutlined />}>Upload Badge Icon</Button>
                </Upload>
                {/* {icon && (
                <div className="icon-preview">
                    <img
                    src={URL.createObjectURL(icon)}
                    alt="Badge Icon Preview"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', marginTop: '10px' }}
                    />
                    <Button
                    icon={<CloseCircleOutlined />}
                    type="link"
                    onClick={() => this.setState({ icon: null })}
                    >
                    Remove
                    </Button>
                </div>
                )} */}
            </Form.Item>

            <Form.Item label="Type" name="type" initialValue="manual">
                <Select>
                <Option value="manual">Manual Assignment</Option>
                <Option value="automatic">Automatic Assignment</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Criteria (Optional)" name="criteria">
                <TextArea
                placeholder="Post unique smoothie recipes that receive over 100 upvotes and also spark a discussion"
                value={criteria}
                rows={3}
                onChange={(e) => this.setState({ criteria: e.target.value })}
                />
            </Form.Item>

            {/* <Form.Item>
                <Button type="primary" htmlType="submit" block>
                Create Badge
                </Button>
            </Form.Item> */}
            </Form>
        </div>
        </Modal>
      </div>
    );
  }
}

export default CreateBadge