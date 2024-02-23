import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, BookOutlined, BarsOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { isAdmin } from '../utilities/authorizationHelper';
import { Link } from 'react-router-dom';

const NavBar = () => {

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
      </Menu>
    </ConfigProvider>
  );
}

export default NavBar;