import { useState } from 'react';
import { Layout, Avatar, Drawer, Grid, Card, Button, Modal, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import useAuth from "../components/Auth/useAuth";
import LeftSidebar from '../components/MainLayout/LeftSidebar';
import '../assets/logo.css';
import Navbar from '../components/MainLayout/Navbar';
import RightSidebar from '../components/MainLayout/RightSidebar';


const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({ children }) {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [rightDrawerVisible, setRightDrawerVisible] = useState(false);

    const screens = useBreakpoint();


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Layout>
            <LeftSidebar />
            <Layout style={{  padding: screens.md ? '0 24px 24px' :  '44px 24px 24px'}}>
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
                <Footer
                    className="logo"
                    style={{ textAlign: 'center', fontWeight: 700, color: '#a1a1a1', fontSize: 18 }}
                >
                    huddleup ©{new Date().getFullYear()}
                </Footer>
            </Layout>

            <RightSidebar />
        </Layout>
        </Layout>
    );
}
