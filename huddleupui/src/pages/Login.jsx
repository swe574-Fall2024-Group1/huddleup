import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, message, Grid } from 'antd';
import '../components/Register/Register.css'
import LoginForm from '../components/Login/LoginForm';
import '../assets/logo.css';

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const Login = (props) => {
    const location = useLocation();

    const screens = useBreakpoint();

    if (location.state) {
        message.error(location.state.loginMessage);
    }

    return (
        <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
            {/* Conditionally render Header as a banner on mobile */}
            {screens.md ? (
                <Sider
                    className='login-sider'
                    width={'40%'}
                    breakpoint='md'
                    collapsedWidth={0}
                    zeroWidthTriggerStyle={{ display: 'none' }}
                    style={{ backgroundColor: '#7952CC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div className='login-logo logo-white' style={{ fontSize: 60, color: 'white' }}>
                        huddleup
                    </div>
                </Sider>
            ) : (
                <Header style={{ textAlign: 'center', backgroundColor: '#7952CC', padding: '0px' }}>
                    <div style={{ fontSize: 40, color: "white", fontWeight: 'bold' }}>
                        huddleup
                    </div>
                </Header>
            )}
            <Layout className="login-layout" style={{ padding: screens.xs ? '0 20px' : '0 50px' }}>
                <Content style={{ marginTop: screens.xs ? 20 : 0 }}>
                    <div
                        style={{
                            marginLeft: screens.xs ? 0 : 300,
                            fontSize: screens.xs ? 20 : 25,
                            color: "#7952CC",
                            fontWeight: 400,
                            textAlign: screens.xs ? 'center' : 'left',
                            marginBottom: screens.xs ? 20 : 30
                        }}
                    >
                        <p style={{ marginLeft: screens.xs ? 0 : 10 }}>
                            Welcome back!
                        </p>
                        <p>
                            Login to Huddleup.
                        </p>
                    </div>

                    <LoginForm />

                    <div
                        style={{
                            textAlign: screens.xs ? 'center' : 'left',
                            marginLeft: screens.xs ? 0 : 280,
                            fontSize: 15,
                            color: "#5c5b5b",
                            fontWeight: 400,
                            marginTop: 20
                        }}
                    >
                        Don't have an account? <a href="/register" style={{ color: "#7952CC" }}>Sign Up</a>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
};

export default Login;