import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, message } from 'antd';

import '../components/Register/Register.css'
import RegisterForm from '../components/Register/RegisterForm';

const Login = (props) => {

    const location = useLocation();

    const { Sider } = Layout;


    if (location.state) {
        message.error(location.state.loginMessage);
    }

    return (
        <Layout style={{ height: '100vh', backgroundColor: 'white' }} >
            <Sider className='login-sider' width={'40%'} breakpoint='xs' collapsedWidth={0} zeroWidthTriggerStyle={{ display: 'none' }}>
                <div className='login-logo'>
                    huddleup
                </div>

            </Sider>
            <Layout className="login-layout">
                <RegisterForm />
            </Layout>

        </Layout>
    )
};

export default Login;