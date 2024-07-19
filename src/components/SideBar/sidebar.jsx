import React, { useContext, useEffect } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { connectionProvider } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import {Layout, Menu } from 'antd';
const { Sider } = Layout;

function Sidebar() {
  const {
    collapsed,
  } = useContext(connectionProvider);

const navigate = useNavigate();


useEffect(() => {

}
, [collapsed]);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Home',
              onClick: () => {navigate('/home', { replace: true })},
            },
            // {
            //   key: '2',
            //   icon: <VideoCameraOutlined />,
            //   label: 'Logout',
            //   onClick :()=>{logout()},
            // },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'nav 3',
            // },
          ]}
        />
      </Sider>
    );
}   

export default Sidebar