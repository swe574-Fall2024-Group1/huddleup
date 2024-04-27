import { useState } from 'react';
import { TeamOutlined, PlusOutlined, UsergroupAddOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout, Avatar, Card, Button, Modal, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import "../../assets/main-layout.css"
import useAuth from '../../components/Auth/useAuth';

const { Sider } = Layout;

const RightSidebar = () => {

    // Sample data for owned communities (replace with actual data)
    const ownedCommunities = [
        { id: 1, name: 'Community 1', image: 'url/to/image1.jpg' },
        { id: 2, name: 'Community 2', image: 'url/to/image2.jpg' },
        // Add more communities as needed
    ];

    // Sample data for connections (replace with actual data)
    const connections = [
        { id: 1, name: 'John Doe', avatar: 'url/to/avatar1.jpg' },
        { id: 2, name: 'Jane Smith', avatar: 'url/to/avatar2.jpg' },
        // Add more connections as needed
    ];

    // State to manage modal visibility for owned communities
    const [ownedCommunitiesModalVisible, setOwnedCommunitiesModalVisible] = useState(false);

    // State to manage modal visibility for connections
    const [connectionsModalVisible, setConnectionsModalVisible] = useState(false);

    // Function to toggle modal visibility for owned communities
    const toggleOwnedCommunitiesModal = () => {
        setOwnedCommunitiesModalVisible(!ownedCommunitiesModalVisible);
    };

    // Function to toggle modal visibility for connections
    const toggleConnectionsModal = () => {
        setConnectionsModalVisible(!connectionsModalVisible);
    };


    return (
        <Sider width={300} style={{ background: 'transparent', borderTop: '1px solid #f0f0f0', marginRight:20, marginTop: 20 }}>
            <Card title="Owned Communities" bordered={false}>
                <Row gutter={[16, 16]}>
                    {ownedCommunities.map(community => (
                        <Col span={10} key={community.id}>
                            <Row justify="center">
                                <Avatar src={community.image} size={35} />
                            </Row>
                            <Row justify="center">
                                <span>{community.name}</span>
                            </Row>
                        </Col>
                    ))}
                </Row>
                {ownedCommunities.length > 10 && (
                    <Button type="link" onClick={toggleOwnedCommunitiesModal}>
                        See all owned communities
                    </Button>
                )}
            </Card>
            <Card title="Connections" style={{ marginTop: 16 }} bordered={false}>
                <Row gutter={[16, 16]}>
                    {connections.map(connection => (
                        <Col span={10} key={connection.id}>
                            <Row justify="center">
                                <Avatar src={connection.avatar} size={35} />
                            </Row>
                            <Row justify="center">
                                <span>{connection.name}</span>
                            </Row>
                        </Col>
                    ))}
                </Row>
                {connections.length > 10 && (
                    <Button type="link" onClick={toggleConnectionsModal}>
                        See all connections
                    </Button>
                )}
            </Card>
            <Modal
                title="All Owned Communities"
                visible={ownedCommunitiesModalVisible}
                onCancel={toggleOwnedCommunitiesModal}
                footer={null}
            >
                <div>
                    {ownedCommunities.map(community => (
                        <div key={community.id}>
                            <Avatar src={community.image} size="small" style={{ marginRight: 8 }} />
                            <span>{community.name}</span>
                        </div>
                    ))}
                </div>
            </Modal>
            <Modal
                title="All Connections"
                visible={connectionsModalVisible}
                onCancel={toggleConnectionsModal}
                footer={null}
            >
                <div>
                    {connections.map(connection => (
                        <div key={connection.id}>
                            <Avatar src={connection.avatar} size="small" style={{ marginRight: 8 }} />
                            <span>{connection.name}</span>
                        </div>
                    ))}
                </div>
            </Modal>
        </Sider>

    );
};

export default RightSidebar