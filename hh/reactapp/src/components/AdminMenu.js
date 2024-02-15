import React, { useState } from 'react';
import '../styles/AdminMenu.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, BookOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Form, Input, Select, theme } from 'antd';
import { API_URL } from '../common/GlobalConstants';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const AdminMenu = () => {
    const courses = [
        { id: '1', title: 'Основни знания' },
        { id: '2', title: 'ООП' },
        { id: '3', title: 'SQL' },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [selectedNav, setSelectedNav] = useState('1');
    const [modalVisibilities, setModalVisibilities] = useState({
        lesson: false,
        paragraph: false,
        codeSnippet: false,
    });

    const toggleModalVisibility = (key) => {
        setModalVisibilities((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const handleMenuClick = (key) => {
        setSelectedNav(key);
    };

    const handleAddLesson = (values) => {
        axios.post(API_URL + '/api/Lesson/addLesson', values)
            .then(response => {
                console.log(response.data);
            });

        toggleModalVisibility('lesson');
    };

    return (
        <Layout className='admin-container'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedNav]}
                    onClick={({ key }) => handleMenuClick(key)}
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        Потребители
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BookOutlined />}>
                        Уроци
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {selectedNav === '2' && (
                        <>
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                style={{ marginLeft: '16px' }}
                                onClick={() => toggleModalVisibility('lesson')}
                            >
                                Добави урок
                            </Button>
                            <Modal
                                title="Добави урок"
                                open={modalVisibilities.lesson}
                                onCancel={() => toggleModalVisibility('lesson')}
                                footer={null}
                            >
                                <Form
                                    onFinish={handleAddLesson}
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    <Form.Item
                                        label="Заглавие"
                                        name="title"
                                        rules={[{ required: true, message: 'Заглавието на урока е задължително.' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Описание"
                                        name="description"
                                        rules={[{ required: true, message: 'Описанието на урока е задължително.' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Курс"
                                        name="courseId"
                                        rules={[{ required: true, message: 'Моля изберете курс' }]}
                                    >
                                        <Select>
                                            {courses.map((course) => (
                                                <Select.Option key={course.id} value={course.id}>
                                                    {course.title}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                        <Button type="primary" htmlType="submit">
                                            Add Lesson
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </>
                    )}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminMenu;