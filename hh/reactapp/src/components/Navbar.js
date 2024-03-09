import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, BookOutlined, BarsOutlined, LogoutOutlined, LoginOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { getToken, isAdmin } from '../utilities/authorizationHelper';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import stillbg from '../images/stillbg.jpg';
import bg1 from '../images/site-background1.gif';

const NavBar = () => {
  const navigate = useNavigate();
  const config = {
    token: {
      colorPrimary: "#b02c2a",
      colorSecondary: '#ee4542',
      colorInfo: "#ee4542",
      colorTextBase: "#101010",
      colorBgBase: "#101010",
      colorBgContainer: "#101010",
    },
  };

  const [paused, setPaused] = useState(true);

  const changeBg = () => {
    let body = document.querySelector('body')
    if (paused) {
      body.style.backgroundImage = `url(${stillbg})`;
    } else {
      body.style.backgroundImage = `url(${bg1})`;
    }
    setPaused(!paused);
  }

  return (
    <ConfigProvider theme={config}>
      <Menu mode="horizontal" style={{ padding: 0, background: config.token.colorSecondary }}>

        <Menu.Item icon={<HomeOutlined />}>
          <Link to={`/home`}>
            Главно меню
          </Link>
        </Menu.Item>

        <Menu.Item icon={<UserOutlined />}>
          <Link to={`/forums`}>
            Форуми
          </Link>
        </Menu.Item>

        <Menu.Item icon={<BookOutlined />}>
          <Link to={`/courses`}>
            Курсове
          </Link>
        </Menu.Item>

        {isAdmin() && (
          <Menu.Item icon={<BarsOutlined />}>
            <Link to={`/admin`}>
              Админ
            </Link>
          </Menu.Item>
        )}

        <Menu.Item icon={<PlayCircleOutlined />} onClick={changeBg}>
          {/* click twice if it doesnt work lol */}
          Фон
        </Menu.Item>

        {!getToken() ? (
          <Menu.Item icon={<LoginOutlined />}
            style={{ marginLeft: 'auto' }}
          >
            <Link to={`/login`}>
              Влезни
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item icon={<LogoutOutlined />}
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              sessionStorage.removeItem('token');
              navigate('/home');
            }}
          >
            Излез
          </Menu.Item>
        )}

      </Menu>
    </ConfigProvider>
  );
}

export default NavBar;