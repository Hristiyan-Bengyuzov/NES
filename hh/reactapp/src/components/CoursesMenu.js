import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from 'react-router-dom';
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import "../styles/CoursesMenu.css";

const CoursesMenu = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(API_URL + '/api/Course/getCourses');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="background">
      <div className="LMcontainer">
        {courses.map(course => (
          <div className="courses-container">
          <Link
            to={`/course/${course.id}`}
            className={`${course.styles}`}
            style={{ textDecoration: 'none' }}
            key={course.id}
          >
            <div className="imageWrapper">
              <img src={require(`../images/${course.imagePath}`)} alt="" className="CCimage" />
              <p>{course.title}</p>
            </div>
          </Link>
          <Link to={`/test/1`} className='quiz-button-courses'>&#62;Тест&#60;</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesMenu;