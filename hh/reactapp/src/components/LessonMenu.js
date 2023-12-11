import "../styles/LessonMenu.css"
import { Link } from 'react-router-dom';
import pbimage from '../images/pbimage.jpg';
import oopimage from '../images/oopimage.png';
import sqlimage from '../images/sqlimage.png';

const LessonMenu = () => {
  return (
    <div className="background">
      <div className="LMcontainer">
        <Link to="/PBLessons" className="programmingBasics clickContainer" style={{ textDecoration: 'none' }}>
          <div className="imageWrapper">
            <img src={pbimage} alt="" className="CCimage"/>
            <p>ОСНОВНИ ЗНАНИЯ</p>
          </div>
        </Link>
        <Link to="/OOPLessons" className="oop clickContainer oopSQLClickContainer" style={{ textDecoration: 'none' }}>
        <img src={oopimage} alt="" className="CCimage" />
        <p>ООП</p>
        </Link>
        <Link to="/SQLLessons" className="sql clickContainer oopSQLClickContainer" style={{ textDecoration: 'none' }}>
          <img src={sqlimage} alt="" className="CCimage" />
          <p>SQL</p>
        </Link>
      </div>
    </div>
  );
}
 
export default LessonMenu;