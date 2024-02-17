import React, { useState, useEffect } from 'react';
import '../styles/AdminMenu.css';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, BookOutlined, EditOutlined, CodeOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Modal, Form, Input, Select, Table, theme, ConfigProvider } from 'antd';
import { API_URL } from '../common/GlobalConstants';
import axios from 'axios';
import { isAdmin } from '../utilities/authorizationHelper';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminMenu = () => {
    const navigate = useNavigate();
    const courses = [
        { id: '1', title: 'Основни знания' },
        { id: '2', title: 'ООП' },
        { id: '3', title: 'SQL' },
    ];

    const [collapsed, setCollapsed] = useState(false);
    const config = {
        token: {
            colorPrimary: "#b02c2a",
            colorSecondary: '#ee4542',
            colorInfo: "#ee4542",
            colorTextBase: "#e4e4e4",
            colorBgBase: "#101010",
            colorBgContainer: "#101010",
        },
    };

    const [selectedNav, setSelectedNav] = useState('1');
    const [modalVisibilities, setModalVisibilities] = useState({
        lesson: false,
        paragraph: false,
        codeSnippet: false,
    });
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState({});
    const [currentParagraph, setCurrentParagraph] = useState({});
    const [paragraphs, setParagraphs] = useState([]);
    const [lessonParagraphs, setLessonParagraphs] = useState([]);
    const [paragraphCodeSnippets, setParagraphCodeSnippets] = useState([
        { language: '', content: '' },
    ]);

    const handleCodeSnippetChange = (index, value) => {
        const updatedCodeSnippets = [...paragraphCodeSnippets];
        updatedCodeSnippets[index].content = value;
        setParagraphCodeSnippets(updatedCodeSnippets);
    };

    const handleLanguageChange = (index, value) => {
        const updatedCodeSnippets = [...paragraphCodeSnippets];
        updatedCodeSnippets[index].language = value;
        setParagraphCodeSnippets(updatedCodeSnippets);
    };

    const addCodeSnippet = () => {
        setParagraphCodeSnippets([...paragraphCodeSnippets, { language: '', content: '' }]);
    };

    const postCodeSnippets = () => {
        const codeSnippets = paragraphCodeSnippets.map(({ language, content }) => ({
            language,
            content,
        }));

        const payload = {
            paragraphId: currentParagraph.id,
            codeSnippets: codeSnippets,
        };

        axios.post(API_URL + '/api/CodeSnippet/createCodeSnippets', payload)
            .then(response => console.log(response.data));
    };

    const removeCodeSnippet = (index) => {
        const updatedCodeSnippets = [...paragraphCodeSnippets];
        updatedCodeSnippets.splice(index, 1);
        setParagraphCodeSnippets(updatedCodeSnippets);
    };

    const handleParagraphChange = (index, value) => {
        const updatedParagraphs = [...lessonParagraphs];
        updatedParagraphs[index] = value;
        setLessonParagraphs(updatedParagraphs);
    };

    const addParagraph = () => {
        setLessonParagraphs([...lessonParagraphs, '']);
    };

    const removeParagraph = (index) => {
        const updatedParagraphs = [...lessonParagraphs];
        updatedParagraphs.splice(index, 1);
        setLessonParagraphs(updatedParagraphs);
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

    const fetchParagraphs = async (lessonId) => {
        try {
            const response = await axios.get(API_URL + `/api/Paragraph/getLessonParagrahs/${lessonId}`);
            setParagraphs(response.data);
        } catch (error) {
            console.error('Error fetching paragraphs:', error);
        }
    };

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/unauthorized');
        }
    }, []);

    return (
        <ConfigProvider theme={config}>
            <Layout className='admin-container'>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: config.token.colorSecondary }}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        style={{ background: config.token.colorSecondary }}
                        selectedKeys={[selectedNav]}
                        onClick={({ key }) => handleMenuClick(key)}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Потребители
                        </Menu.Item>
                        <Menu.Item key="2" icon={<BookOutlined />}>
                            Уроци
                        </Menu.Item>
                        <Menu.Item key="3" icon={<EditOutlined />}>
                            Параграфи
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: config.token.colorSecondary }}>
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
                                                Добави урок
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
                        }}
                    >
                        {selectedNav === '1' && (
                            <h2 style={{ color: '#e4e4e4' }}>Потребители:</h2>
                        )}
                        {selectedNav === '2' && (
                            <>
                                <h2 style={{ color: '#e4e4e4' }}>Уроци:</h2>
                                <Select
                                    placeholder="Избери курс"
                                    style={{ width: 200, marginBottom: 16 }}
                                    onChange={fetchLessons}
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
                        {selectedNav === '3' && (
                            <>
                                <h2 style={{ color: '#e4e4e4' }}>Параграфи:</h2>
                                <Select
                                    placeholder="Избери курс..."
                                    style={{ width: 200, marginBottom: 16 }}
                                    onChange={fetchLessons}
                                >
                                    {courses.map((course) => (
                                        <Select.Option key={course.id} value={course.id}>
                                            {course.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    placeholder="Избери урок..."
                                    style={{ width: 200, marginBottom: 16 }}
                                    onChange={fetchParagraphs}
                                >
                                    {lessons.map((lesson) => (
                                        <Select.Option key={lesson.id} value={lesson.id}>
                                            {lesson.title}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Table
                                    dataSource={paragraphs}
                                    columns={[
                                        { title: 'ID', dataIndex: 'id', key: 'id' },
                                        { title: 'Съдържание', dataIndex: 'content', key: 'content' },
                                        {
                                            title: 'Действия',
                                            key: 'actions',
                                            render: (text, record) => (
                                                <Button icon={<CodeOutlined />} onClick={() => {
                                                    setCurrentParagraph(record);
                                                    toggleModalVisibility('codeSnippet');
                                                }
                                                }>
                                                    Добави кодчета
                                                </Button>
                                            ),
                                        },
                                    ]}
                                />
                                <Modal
                                    title={currentParagraph.content}
                                    open={modalVisibilities.codeSnippet}
                                    onCancel={() => toggleModalVisibility('codeSnippet')}
                                    footer={null}
                                >
                                    {paragraphCodeSnippets.map((codeSnippet, index) => (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            <Select
                                                style={{ width: '100%', marginBottom: '5px' }}
                                                placeholder="Select Language"
                                                onChange={(value) => handleLanguageChange(index, value)}
                                            >
                                                <Select.Option value="csharp">C#</Select.Option>
                                                <Select.Option value="java">Java</Select.Option>
                                                <Select.Option value="sql">SQL</Select.Option>
                                            </Select>
                                            <Input.TextArea
                                                rows={3}
                                                placeholder="Добави код..."
                                                value={codeSnippet.content}
                                                onChange={(e) => handleCodeSnippetChange(index, e.target.value)}
                                            />
                                            <Button style={{ marginTop: '5px' }} onClick={() => removeCodeSnippet(index)}>
                                                Махни код
                                            </Button>
                                        </div>
                                    ))}

                                    <Button style={{ marginTop: '10px' }} onClick={addCodeSnippet}>
                                        Добави код
                                    </Button>

                                    <div style={{ marginTop: '10px' }}>
                                        <Button type='primary' onClick={postCodeSnippets}>Качи</Button>
                                    </div>
                                </Modal>
                            </>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default AdminMenu;