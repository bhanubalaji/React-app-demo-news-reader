import React, { useState,useContext } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {connectionProvider } from '../../context/context';
import { Button, Layout, theme } from 'antd';
import './header.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import {AuthService} from '../../services/auth.services';

const { Header } = Layout;

function HeaderComponent() {
  const { logout } = AuthService();

const navigate = useNavigate();

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


      const logoutset = async () => {
        try {
          const response = await logout();
          console.log('response...............',response);

          if (response) {
           navigate('/auth/login', { replace: true });
           localStorage.clear();
          } else {
            console.error("Failed to fetch dashboard");
          }
        } catch (error) {
          console.error("Error during dashboard API request:", error.message);
        } finally {
          // setLoading(false);
          console.log('')
        }
      };


      // const logout = async () => {
      //   try {
      //     const response = await fetch('http://localhost:4000/user/logout', {
      //       method: 'GET',
      //       credentials: 'include', // Include cookies in the request
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     });
      
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      
      //     const data = await response.json();
      //     if (data) {
      //       // Assuming `navigate` is properly imported and used
      //       navigate('/auth/login', { replace: true }); // Redirect to login page after successful logout
      //     }
      
      //     console.log('Response from server:', data);
      //   } catch (error) {
      //     console.error('Error:', error);
      //   }
      // };

      // const logout = async () => {
        // try {
        //   const response = await axios.get('http://localhost:4000/user/logout', {
        //     withCredentials: true, // Include cookies in the request
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });
      
        //   if (response.status === 200) {
        //     // Assuming `navigate` is properly imported and used
        //     navigate('/auth/login', { replace: true }); // Redirect to login page after successful logout
        //   } else {
        //     throw new Error('Network response was not ok');
        //   }
      
        //   console.log('Response from server:', response.data);
        // } catch (error) {
        //   console.error('Error:', error);
        // }
      // };
     

    return (
        <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
         <div className='logo'>
          DEM0 NEWS READ APP
          <div onClick={logoutset} className='logout'>
          LogOut
         </div>
         </div>
       
      </Header>
    );
}

export default HeaderComponent