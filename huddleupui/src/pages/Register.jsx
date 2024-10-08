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
                <div className='login-logo logo-white' style={{ fontSize: 60 }}>
                    huddleup
                </div>

            </Sider>
            <Layout className="login-layout">
                <div style={{textAlign:'left', marginLeft:300, fontSize: 25, color: "#7952CC", fontWeight: 400, marginBottom: 30}}>
                    Create Account
                </div>
                <RegisterForm />
                <div>
                    <div style={{textAlign:'left',marginLeft:280, fontSize: 15, color: "#5c5b5b", fontWeight: 400, marginTop: 20}}>
                        Already have an account? <a href="/login" style={{color: "#7952CC"}}>Login</a>
                    </div>
                </div>
            </Layout>

        </Layout>
    )
};

export default Login;