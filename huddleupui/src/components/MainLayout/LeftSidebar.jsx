import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Divider, Drawer, Card, Grid, Button } from 'antd';
import { TeamOutlined, PlusOutlined,NotificationOutlined, MailOutlined, CompassOutlined, UserSwitchOutlined } from '@ant-design/icons';
import "../../assets/main-layout.css"
import useAuth from '../Auth/useAuth';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const LeftSidebar = () => {

    const navigate = useNavigate();
    const { userInfo } = useAuth()

    const handleMenuClick = (path) => {
        toggleDrawer();
        navigate(path);
    };


    // handle default selected key from the URL
    const currentPath = window.location.pathname;
    let defaultSelectedKey = null;
    if (currentPath === '/feed') {
        defaultSelectedKey = '1';
    } else if (currentPath === '/connections') {
        defaultSelectedKey = '2';
    } else if (currentPath === '/communities') {
        defaultSelectedKey = '3';
    } else if (currentPath === '/invitations') {
        defaultSelectedKey = '5';
    } else if (currentPath === '/discover') {
        defaultSelectedKey = '6';
    }


    const screens = useBreakpoint();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);

    return (
        <>
            {screens.md ? (
                <Sider width={300} style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #f0f0f0' }}>
                    <Card
                        style={{ marginTop: 20, marginLeft: 20, boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
                        bordered={false}
                    >
                        <div style={{ marginLeft: 30, color: '#5c5b5b' }}>
                            <div>
                                Hello, <span style={{ color: '#7952CC' }}>{userInfo?.username || ''}</span>!
                            </div>
                            <div>It's a nice day to join new communities. ☀️</div>
                        </div>
                        <Divider />
                        <Menu
                            mode="inline"
                            selectedKeys={[defaultSelectedKey]}
                            style={{ height: '100%', borderRight: 0, marginTop: 10 }}
                        >
                            <Menu.Item key="1" icon={<NotificationOutlined />} onClick={() => handleMenuClick('/feed')}>
                                Feed
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserSwitchOutlined />} onClick={() => handleMenuClick('/connections')}>
                                Connections
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TeamOutlined />} onClick={() => handleMenuClick('/communities')}>
                                Communities
                            </Menu.Item>
                            <Menu.Item key="5" icon={<MailOutlined />} onClick={() => handleMenuClick('/invitations')}>
                                Invitations
                            </Menu.Item>
                            <Menu.Item key="6" icon={<CompassOutlined />} onClick={() => handleMenuClick('/discover')}>
                                Discover
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="4" icon={<PlusOutlined />} onClick={() => handleMenuClick('/communities/new')}>
                                Start Community
                            </Menu.Item>
                        </Menu>
                    </Card>
                </Sider>
            ) : (
                <>
                    <Button
                        onClick={toggleDrawer}
                        style={{ position: 'absolute', left: 10, top: 80, zIndex: 1000 }}
                    >
                        Open Sidebar
                    </Button>
                    <Drawer
                        title="huddleup"
                        placement="left"
                        onClose={toggleDrawer}
                        visible={drawerVisible}
                        width={250}
                    >
                        <div style={{ color: '#5c5b5b', padding: '0 20px' }}>
                            <div>
                                Hello, <span style={{ color: '#7952CC' }}>{userInfo?.username || ''}</span>!
                            </div>
                            <div>It's a nice day to join new communities. ☀️</div>
                        </div>
                        <Divider />
                        <Menu
                            mode="inline"
                            selectedKeys={[defaultSelectedKey]}
                            style={{ borderRight: 0, marginTop: 10 }}
                        >
                            <Menu.Item key="1" icon={<NotificationOutlined />} onClick={() => handleMenuClick('/feed')}>
                                Feed
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserSwitchOutlined />} onClick={() => handleMenuClick('/connections')}>
                                Connections
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TeamOutlined />} onClick={() => handleMenuClick('/communities')}>
                                Communities
                            </Menu.Item>
                            <Menu.Item key="5" icon={<MailOutlined />} onClick={() => handleMenuClick('/invitations')}>
                                Invitations
                            </Menu.Item>
                            <Menu.Item key="6" icon={<CompassOutlined />} onClick={() => handleMenuClick('/discover')}>
                                Discover
                            </Menu.Item>
                            <Divider />
                            <Menu.Item key="4" icon={<PlusOutlined />} onClick={() => handleMenuClick('/communities/new')}>
                                Start Community
                            </Menu.Item>
                        </Menu>
                    </Drawer>
                </>
            )}
        </>
    );
};

export default LeftSidebar