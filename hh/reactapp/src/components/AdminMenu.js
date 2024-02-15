import React, { useState, useEffect } from 'react';
import '../styles/AdminMenu.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, BookOutlined, } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Form, Input, Select, Table, theme } from 'antd';
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
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState({});

    const handleCourseChange = (value) => {
        fetchLessons(value);
    };

    const getCourseTitleById = (id) => {
        const course = courses.find(course => course.id === id);
        return course ? course.title : '';
    };

    const [lessonParagraphs, setLessonParagraphs] = useState([]);

    const handleParagraphChange = (index, value) => {
        const updatedParagraphs = [...lessonParagraphs];
        updatedParagraphs[index] = value;
        setLessonParagraphs(updatedParagraphs);
    };

    const addParagraph = () => {
        setLessonParagraphs([...lessonParagraphs, '']);
    };

    const postParagraphs = () => {
        const data = {
            lessonId: currentLesson.id,
            paragraphs: lessonParagraphs,
        };

        axios.post(API_URL + '/api/Paragraph/createParagraphs', data)
            .then(reponse => console.log(reponse.data));

        toggleModalVisibility('paragraph');
    };

    const removeParagraph = (index) => {
        const updatedParagraphs = [...lessonParagraphs];
        updatedParagraphs.splice(index, 1);
        setLessonParagraphs(updatedParagraphs);
    };

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

    const fetchLessons = async (courseId) => {
        try {
            const response = await axios.get(API_URL + `/api/Lesson/getCourseLessons/${courseId}`);
            setLessons(response.data);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
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
                    {selectedNav === '1' && (
                        <div>Потребители</div>
                    )}
                    {selectedNav === '2' && (
                        <>
                            <h2>Уроци:</h2>
                            <Select
                                placeholder="Избери курс"
                                style={{ width: 200, marginBottom: 16 }}
                                onChange={handleCourseChange}
                            >
                                {courses.map((course) => (
                                    <Select.Option key={course.id} value={course.id}>
                                        {course.title}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Table
                                dataSource={lessons}
                                columns={[
                                    { title: 'ID', dataIndex: 'id', key: 'id' },
                                    { title: 'Заглавие', dataIndex: 'title', key: 'title' },
                                    { title: 'Описание', dataIndex: 'description', key: 'description' },
                                    {
                                        title: 'Действия',
                                        key: 'actions',
                                        render: (text, record) => (
                                            <Button onClick={() => {
                                                setCurrentLesson(record);
                                                toggleModalVisibility('paragraph');
                                            }}>
                                                Добави параграфи
                                            </Button>
                                        ),
                                    },
                                ]}
                            />
                            <Modal
                                title={`Добавяне на параграфи за урок ${currentLesson.title}`}
                                open={modalVisibilities.paragraph}
                                onCancel={() => toggleModalVisibility('paragraph')}
                                footer={null}
                            >
                                {lessonParagraphs.map((paragraph, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <Input.TextArea
                                            rows={3}
                                            placeholder="Добави параграф..."
                                            value={paragraph}
                                            onChange={(e) => handleParagraphChange(index, e.target.value)}
                                        />
                                        <Button style={{ marginTop: '5px' }} onClick={() => removeParagraph(index)}>
                                            Махни параграф
                                        </Button>
                                    </div>
                                ))}

                                <Button style={{ marginTop: '10px' }} onClick={addParagraph}>
                                    Добави параграф
                                </Button>

                                <div style={{ marginTop: '10px' }}>
                                    <Button type='primary' onClick={postParagraphs}>Качи</Button>
                                </div>
                            </Modal>
                        </>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminMenu;