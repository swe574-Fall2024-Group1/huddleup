import { useState } from 'react';
import { Layout, Avatar, Card, Button, Modal, Row, Col } from 'antd';
import { UserOutlined, BellOutlined, TeamOutlined, PlusOutlined, UsergroupAddOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import useAuth from "components/Auth/useAuth";
import LeftSidebar from 'components/MainLayout/LeftSidebar';
import '../assets/logo.css';
import Navbar from 'components/MainLayout/Navbar';
import RightSidebar from 'components/MainLayout/RighSidebar';


const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout({ children }) {
    const { userInfo } = useAuth();
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Layout>
                <LeftSidebar />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 10,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {children}
                    </Content>
                    <Footer className='logo' style={{ textAlign: 'center', fontWeight: 700, color: '#a1a1a1', fontSize: 18 }}>huddleup ©{new Date().getFullYear()}</Footer>
                </Layout>
                <RightSidebar />
            </Layout>
        </Layout>
    );
}
