import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, message, Grid } from 'antd';

import '../components/Register/Register.css'
import RegisterForm from '../components/Register/RegisterForm';

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
            {/* Display Header as a banner on mobile; Sider on larger screens */}
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
            <Layout className="login-layout" style={{ padding: screens.md ? '0 50px' : '0 20px' }}>
                <Content style={{ marginTop: screens.md ? 0 : 20 }}>
                    <div
                        style={{
                            textAlign: screens.md ? 'left' : 'center',
                            marginLeft: screens.md ? 300 : 0,
                            fontSize: screens.md ? 25 : 20,
                            color: "#7952CC",
                            fontWeight: 400,
                            marginBottom: screens.md ? 30 : 20
                        }}
                    >
                        Create Account
                    </div>

                    <RegisterForm />

                    <div
                        style={{
                            textAlign: screens.md ? 'left' : 'center',
                            marginLeft: screens.md ? 280 : 0,
                            fontSize: 15,
                            color: "#5c5b5b",
                            fontWeight: 400,
                            marginTop: 20
                        }}
                    >
                        Already have an account? <a href="/login" style={{ color: "#7952CC" }}>Login</a>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
};

export default Login;