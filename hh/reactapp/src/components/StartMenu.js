import "../styles/StartMenu.css"
import { Link } from 'react-router-dom';

const StartMenu = () => {
  return (
    <div className="big-container">
      <div className="container">
        <div className="start-menu">
          <Link to="/lessonSections" className='start-buttons start' style={{ textDecoration: 'none' }}>СТАРТ</Link>
          <Link to="/options" className='start-buttons options' style={{ textDecoration: 'none' }}>Опции</Link>
          <Link to="/forums" className='start-buttons info' style={{ textDecoration: 'none' }}>Форуми</Link>
        </div>
        <div className="login-menu">
        <Link to="/login" className="lr login" style={{ textDecoration: 'none' }}>
            Влезни
        </Link>
        <Link to="/register" className="lr login" style={{ textDecoration: 'none' }}>
            Регистрирай се
        </Link>
      </div>
      </div>
    </div >
  );
}

export default StartMenu;