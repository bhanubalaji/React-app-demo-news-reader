import React, { useState } from 'react';
import './dashboard.css';
import {
    HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, DislikeFilled,DislikeOutlined
} from '@ant-design/icons';
import { Layout, theme, Space, Tooltip, Button, Card, Flex, Typography, Modal, Form, Input, message, Upload} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Content } = Layout;
const SubmitButton = ({ form, children, text }) => {
    const [submittable, setSubmittable] = React.useState(false);
    


    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(() => setSubmittable(text))
            .catch(() => setSubmittable(false));
    }, [form, values]);
    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} onClick={() => { form.submit() }}>
            {children}
        </Button>
    );
};

function Dashboard() {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [text, setText] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [submittable, setSubmittable] = React.useState(false);
    const [isImgeData, setIsImgeClick] = useState('');
    const [isImageModal, setImageModal] = useState(false);


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const cardStyle = {
        width: 620,
    };
    const imgStyle = {
        display: 'block',
        width: 273,
    };


    const dashBoardCardData = [
        {
            id: 1,
            imgPath: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus sed fuga eum hic expedita nihil, atque modi dolorem laborum
                    Iste enim accusamus rem hic ducimus deleniti numquam labore delectus voluptas molestias voluptatum doloribus, voluptatem incidunt! Odit,
                                    temporibus, maxime veritatis perferendis quo aperiam explicabo rem id earum dolores eius illum`,
            like: false,
            love: false,
            dislike: false
        },
        {
            id: 2,
            imgPath: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus sed fuga eum hic expedita nihil, atque modi dolorem laborum
                    Iste enim accusamus rem hic ducimus deleniti numquam labore delectus voluptas molestias voluptatum doloribus, voluptatem incidunt! Odit,
                                    temporibus, maxime veritatis perferendis quo aperiam explicabo rem id earum dolores eius illum` ,
            like: false,
            love: false,
            dislike: false

        },
        {
            id: 3,
            imgPath: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus temporibus sed fuga eum hic expedita nihil, atque modi dolorem laborum
                    Iste enim accusamus rem hic ducimus deleniti numquam labore delectus voluptas molestias voluptatum doloribus, voluptatem incidunt! Odit,
                                    temporibus, maxime veritatis perferendis quo aperiam explicabo rem id earum dolores eius illum`     ,
            like: false,
            love: false,
            dislike: false

        }
    ]


    const [cardsData, setCardsData] = useState(dashBoardCardData);

    const handleClickOfLike = (id) => {
        setCardsData(cardsData.map(item =>
            item.id == id ? { ...item, like: !item.like , dislike:false } : item
        ));
    };
    const handleClickOfDisLike = (id) => {
        setCardsData(cardsData.map(item =>
            item.id == id ? { ...item, dislike: !item.dislike ,like: false} : item
        ));
   
    };
    const handleClickLove = (id) => {
        setCardsData(cardsData.map(item => item.id == id ? { ...item, love: !item.love } : item));
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = () => {
        form.resetFields();
     setCardsData(cardsData.concat(
         {
             id: cardsData.length + 1,
             imgPath: imageUrl,
             content: text,
             like: false,
             love: false,
            dislike: false

         }
     ))
     messageApi.open({
        type: 'success',
        content: 'Content added successfully',
      });
        ;
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        form.resetFields();
        // setImageUrl(null);
        // setText('');
        setIsModalOpen(false);
        setImageModal(false);
    };
    const handleOk =()=> {
        setImageModal(false);
    }

    const handleImgeClick = (data) => {
        setImageModal(true);
        setIsImgeClick(data);
    }
    const [imageUrl, setImageUrl] = useState(null);
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        maxCount: 1,
        action: 'https://669781c602f3150fb66de2e5.mockapi.io/api/uplaod/uploadfile',
        beforeUpload(file) {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              message.error('You can only upload image files!');
            }
            return isImage || Upload.LIST_IGNORE;
          },
        onChange(info) {
            setSubmittable(false)
            const { status, originFileObj } = info.file;
            if (status == 'removed') {
                message.error(`${info.file.name} removed successfully.`);
                setSubmittable(false)
            }
            if (status !== 'uploading') {
                const reader = new FileReader();
                reader.onload = () => {
                    setImageUrl(reader.result);
                };
                reader.readAsDataURL(originFileObj);
                setSubmittable(false)

            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setSubmittable(true)
            }

      
            
            else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                setSubmittable(false)

            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
            setSubmittable(true)

        },
    };


    // const validateForm = () => {
    //     form
    //         .validateFields({
    //             validateOnly: true,
    //         })
    //         .then(() => setIsFormValid(true))
    //         .catch(() => setIsFormValid(false));
    // };

    const handleTextChange = (e) => {
        setText(e.target.value);

        // validateForm();
    };


    return (
        
        <div className='mainDashboard'>
            <>
            {contextHolder}
                <div className="dashboard-model">
                    <Button type="primary" onClick={showModal}>
                        UPLOAD Content
                    </Button>
                </div>
                <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <>


                        <Form layout="vertical" form={form} name="validateOnly" autoComplete="off"  onFinish={handleSubmit}

                        >
                            <Form.Item
                                label="UPLOAD IMAGE"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload image',
                                    }
                                ]}
                            >
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                        banned files.
                                    </p>
                                </Dragger>
                            </Form.Item>

                            <Form.Item
                                label="UPLOAD TEXT"
                                name="text"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter some text',
                                    },
                                    {
                                        min: 3,
                                        message: 'Text must be at least Three characters',
                                    },
                                ]}
                            >

                                <TextArea
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Enter your news details"
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                />
                            </Form.Item>
                            <div className='submitCancelBox'>

                                <Form.Item>
                                    <Space>
                                        <SubmitButton form={form} text={submittable}>Submit</SubmitButton>
                                        <Button htmlType="reset">Reset</Button>
                                    </Space>
                                </Form.Item>
                            </div>


                        </Form>
                    </>
                </Modal>
            </>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className='dashboardCard'>

                    {cardsData.map((item) => (


                        <Card key={item.id}
                            hoverable
                            style={cardStyle}
                            styles={{
                                body: {
                                    padding: 0,
                                    overflow: 'hidden',
                                },
                            }}
                        >
                            <Flex >
                                <img className='image-setting'
                                    alt="avatar"
                                    src={item.imgPath}
                                    style={imgStyle}
                                    onClick={() => handleImgeClick(item.imgPath)}
                                />
                                <Flex
                                    vertical
                                    align="flex-start"
                                    
                                    style={{
                                        padding: 32,
                                    }}
                                >
                                    <Typography.Title level={3} onClick={() => handleClickLove(item.id)}>
                                        {item.content}
                                    </Typography.Title>

                                    <Space.Compact block>
                                    <div className='likelove-setting'>
                                        <div className='likedislike'>
                                        <Tooltip title="Like">
                                            <Button icon={item.like ? <LikeFilled style={{ color: 'blue' }} /> : <LikeOutlined />}
                                                onClick={() => handleClickOfLike(item.id)} />
                                        </Tooltip>
                                        <Tooltip title="Dislike">
                                            <Button icon={item.dislike ? <DislikeFilled style={{ color: 'blue' }} /> : <DislikeOutlined />}
                                                onClick={() => handleClickOfDisLike(item.id)} />
                                        </Tooltip>
                                        </div>
                                        <Tooltip title="Heart">
                                            <Button icon={item.love ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                                                onClick={() => handleClickLove(item.id)} />
                                        </Tooltip>
                                    </div>

                                    </Space.Compact>

                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </div>
            </Content>
            <Modal title="Basic Modal" open={isImageModal} onCancel={handleCancel} onOk={handleOk}>
                <img className='modelImage' src={isImgeData} alt="errrrr" />

            </Modal>

        </div>
    );
}


export default Dashboard