import React, { useState,useContext } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {connectionProvider } from '../../context/context';
import { Button, Layout, theme } from 'antd';
import './header.css'

const { Header } = Layout;

function HeaderComponent() {
    const {
        token: { colorBgContainer  },
      } = theme.useToken();
      const [collapseds, setCollapsed] = useState(false);

      const {
        collapsed,
        sidebartrigger
      } = useContext(connectionProvider);



      const clickmeneu = () => {
        console.log('clickmeneu', collapseds);
        sidebartrigger(collapseds);
      };


    return (
        <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
         <div className='logo'>
          DEM0 NEWS READ APP
         </div>
      </Header>
    );
}

export default HeaderComponent