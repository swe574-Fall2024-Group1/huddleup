import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, message } from 'antd';
import '../components/Register/Register.css'
import LoginForm from '../components/Login/LoginForm';
import '../assets/logo.css';


const Login = (props) => {
    const location = useLocation();


    const { Sider } = Layout;

    if (location.state) {
        message.error(location.state.loginMessage);
    }

    return (
        <Layout style={{ height: '100vh', backgroundColor: 'white' }} >
            <Sider className='login-sider' width={'40%'} breakpoint='xs' collapsedWidth={0} zeroWidthTriggerStyle={{ display: 'none' }}>
                <div className='login-logo logo-white' style={{ fontSize: 60 }}>
                    huddleup
                </div>

            </Sider>
            <Layout className="login-layout">
                <div style={{ marginLeft: 300, fontSize: 25, color: "#7952CC", fontWeight: 400, marginBottom: 30 }}>
                    <p style={{marginLeft:10}}>
                          Welcome back!
                    </p>
                    <p>
                        Login to Huddleup.
                    </p>
                </div>
                <LoginForm />
            </Layout>

        </Layout>
    )
};

export default Login;