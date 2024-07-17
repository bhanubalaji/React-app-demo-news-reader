import React from 'react';
import {Layout , Col, Row } from 'antd';

import Sidebar from '../SideBar/sidebar';
import PageRoutes from '../pageRoutes';
import HeaderComponent from "../Header/header";


const LayoutComponent = () => {
  return (
    <div className='mainLayout'>

    <Layout>

       <Sidebar />
    <Layout>

    <HeaderComponent></HeaderComponent>
      
   
      <PageRoutes></PageRoutes>
      </Layout>
  

    </Layout>
    </div>

  );
};
export default LayoutComponent;