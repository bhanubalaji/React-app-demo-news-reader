import React, { useEffect } from 'react';
import {Layout , Col, Row } from 'antd';

import Sidebar from '../SideBar/sidebar';
import PageRoutes from '../pageRoutes';
import HeaderComponent from "../Header/header";
import { useNavigate, Router } from 'react-router-dom';

const LayoutComponent = () => {
 const loginResonseId = localStorage.getItem('loginResonseId');
 const navigate = useNavigate();

//  useEffect(() => {
//    if (!loginResonseId) {
//     navigate('/auth/login', { replace: true });
//    }
//  }, [loginResonseId]);

  return (
    <div className='mainLayout'>

    <Layout>

       <Sidebar />
    <Layout>

    <HeaderComponent></HeaderComponent>
      
   
    {/* <Router> */}
      <PageRoutes />
    {/* </Router> */}
      </Layout>
  

    </Layout>
    </div>

  );
};
export default LayoutComponent;