import { useEffect, useState } from "react";
import "../styles/StartMenu.css"
import { Link } from 'react-router-dom';
import { getToken } from "../utilities/authorizationHelper";

const StartMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="big-container">
      <div className="container">
        <div className="start-menu">
          <Link to="/courses" className='start-buttons start' style={{ textDecoration: 'none' }}>СТАРТ</Link>
          <Link to="/about" className='start-buttons options' style={{ textDecoration: 'none' }}>За нас</Link>
          <Link to="/forums" className='start-buttons info' style={{ textDecoration: 'none' }}>Форуми</Link>
        </div>
        <div className="login-menu">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="lr login" style={{ textDecoration: 'none' }}>
                Влезни
              </Link>
              <Link to="/register" className="lr login" style={{ textDecoration: 'none' }}>
                Регистрирай се
              </Link>
            </>
          )}
        </div>
      </div>
    </div >
  );
}

export default StartMenu;