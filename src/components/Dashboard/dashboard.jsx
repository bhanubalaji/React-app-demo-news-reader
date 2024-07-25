import React, { useEffect, useState } from 'react';
import deleteImg from "../../assets/delete.png";

import './dashboard.css';
import {
    HeartOutlined, HeartFilled, LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined
} from '@ant-design/icons';
import { Layout, theme, Space, Tooltip, Button, Card, Flex, Typography, Modal, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadService } from '../../services/upload.services';

const { TextArea } = Input;
const { Content } = Layout;


function Dashboard() {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [text, setText] = useState('');
    const [submittable, setSubmittable] = React.useState(false);
    const [isImgeData, setIsImgeClick] = useState('');
    const [isImageModal, setImageModal] = useState(false);
    const [fileData, setfileData] = useState('');
    const [isImageUpload, setIsImageUpload] = useState(false);
    const [imageDisplay, setImageDisplay] = useState('');


    const { upload } = UploadService();
    const { getupload } = UploadService()
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
    const [cardsData, setCardsData] = useState([{}]);
    const values = Form.useWatch([], form);




    const fetchUpload = async () => {
        try {
            const response = await getupload();
            console.log('response', response);
            const data = response?.data?.data ? response?.data?.data : [];
            data.forEach((item, index) => {
                item.id = index + 1
            })
            setCardsData(data);
        } catch (error) {
            console.error('Error fetching upload data:', error);
        }
    };

    useEffect(() => {
        fetchUpload();
    }, []);

    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    const handleClickOfLike = (id) => {
        setCardsData(cardsData.map(item =>
            item.id == id ? { ...item, like: !item.like, dislike: false } : item
        ));
    };
    const handleClickOfDisLike = (id) => {
        setCardsData(cardsData.map(item =>
            item.id == id ? { ...item, dislike: !item.dislike, like: false } : item
        ));

    };
    const handleClickLove = (id) => {
        setCardsData(cardsData.map(item => item.id == id ? { ...item, love: !item.love } : item));
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleSubmit = async () => {
        const formDatas = new FormData();
        console.log('formDatas', fileData);
        formDatas.append('file', fileData);
        formDatas.append('id', localStorage.getItem('loginResonseId'));
        formDatas.append('description', text);

        try {
            const response = await upload(formDatas);
            if (response.status === 200) {
                console.log('Response:', response);
                handleCancel();
                fetchUpload()
            }
        } catch (error) {
            console.log('Error:', error);
            message.error(error?.response?.data?.message);
        }
    };


    const handleCancel = () => {
        form.resetFields();
        // setImageUrl(null);
        // setText('');
        setIsModalOpen(false);
        setImageModal(false);
        handleImageDelete();
    };


    const handleOk = () => {
        setImageModal(false);
    }

    const handleImgeClick = (data) => {
        setImageModal(true);
        setIsImgeClick(data);
    }

    const handleFileChange = async (info) => {
        const { status, originFileObj } = info.file;
        console.log('originFileObj', originFileObj, info.file)
        setfileData(originFileObj)
        if (status === 'done') {
            if (originFileObj.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImageDisplay(reader.result);
                    setIsImageUpload(true);
                };
                reader.readAsDataURL(originFileObj);
            } else {
                // Handle non-image files
                setIsImageUpload(false);
            }
        } else if (status === 'removed') {
            setImageDisplay('');
            setIsImageUpload(false);
        }
    };

    const handleImageDelete = () => {
        setImageDisplay('');
        setIsImageUpload(false);
        form.resetFields(['file']);
    };


    const handleTextChange = (e) => {
        setText(e.target.value);
        console.log('isImageUpload', isImageUpload, submittable)
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
                        <Form layout="vertical" form={form} name="validateOnly" autoComplete="off" onFinish={handleSubmit}>

                            <Form.Item label="Upload File" name="file">
                                <div>
                                    {!isImageUpload ? (
                                        <Upload
                                            accept=".pdf, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .doc, .docx, .wav, .mp3, .mp4"
                                            customRequest={({ file, onSuccess }) => {
                                                // Mock request for file upload (replace with actual upload logic)
                                                setTimeout(() => {
                                                    onSuccess();
                                                    handleFileChange({ file: { ...file, status: 'done', originFileObj: file } });
                                                }, 0);
                                            }}
                                            showUploadList={false}
                                            onChange={handleFileChange}
                                        >
                                            <Button icon={<UploadOutlined />}>Attach File</Button>
                                        </Upload>
                                    ) : (
                                        <div className="file">
                                            <img className="fileimg" src={imageDisplay} alt="Uploaded" />
                                            <Button onClick={handleImageDelete} type="link">
                                                <img src={deleteImg} alt="Delete" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
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
                                        <Button type="primary" htmlType="submit" disabled={!isImageUpload || !submittable} >Submit </Button>
                                        <Button htmlType="reset" onClick={handleImageDelete}>Reset</Button>
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
                                    src={item.content_ipfs_url}
                                    style={imgStyle}
                                    onClick={() => handleImgeClick(item.content_ipfs_url)}
                                />
                                <Flex
                                    vertical
                                    align="flex-start"

                                    style={{
                                        padding: 32,
                                    }}
                                >
                                    <Typography.Title level={3} onClick={() => handleClickLove(item.id)}>
                                        {item.description}
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














// const SubmitButton = ({ form, children, text }) => {
//     const [submittable, setSubmittable] = React.useState(false);



//     // Watch all values
//     const values = Form.useWatch([], form);
//     React.useEffect(() => {
//         form
//             .validateFields({
//                 validateOnly: true,
//             })
//             .then(() => setSubmittable(text))
//             .catch(() => setSubmittable(false));
//     }, [form, values]);
//     return (
//         <Button type="primary" htmlType="submit" disabled={!submittable} onClick={() => { form.submit() }}>
//             {children}
//         </Button>
//     );
// };