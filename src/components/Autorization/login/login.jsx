    import React from 'react';
    import { LockOutlined, UserOutlined } from '@ant-design/icons';
    import { Button, message, Form, Input } from 'antd';
    import { useNavigate } from 'react-router-dom';
    import './login.css'
import {AuthService} from '../../../services/auth.services';



    export const LoginInComponent = () => {
      const [messageApi, contextHolder] = message.useMessage();
     const {login} = AuthService()
      const navigate = useNavigate();
      const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await login(values);
            if(response?.status){
              console.log('response------>',response)
                form.resetFields(); 
                localStorage.setItem('loginResonseId', (response?.data?.userData?._id));
                navigate('/home', { replace: true })
                message.success(`Login successfully.`);
            }else{
            message.error(`${response?.message}`);

            }
            console.log('Response from server:', response);
          } catch (error) {
            message.error(`${ error?.message}`);
            // console.error('Error:', error?.error?.message);
          }
      };
      const [form] = Form.useForm();


      return (
    <div className="signupContainer">
     <h3>LogIn Form</h3>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input  placeholder='Enter E-mail'/>
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
          {/* <Form.Item
            name="password"
        label="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item> */}
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}
    
          <Form.Item className='RegisterBox'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a onClick={() => {navigate('/auth/signup', { replace: true })}}>register now!</a>
          </Form.Item>
        </Form>
    </div>

      );
    };