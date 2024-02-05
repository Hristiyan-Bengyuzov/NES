import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import Loading from "./Loading";
import "../styles/Course.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

const Course = () => {
  const { courseId } = useParams();
  const [title, setTitle] = useState('');
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await axios.get(API_URL + `/api/Course/getCourseTitle/${courseId}`);
        setTitle(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    }

    const fetchLessons = async () => {
      try {
        const response = await axios.get(API_URL + `/api/Lesson/getCourseLessons/${courseId}`);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchTitle();
    fetchLessons();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="class-container">
        <h1 className="titlecard">{title}</h1>
        {lessons.map(lesson => (
          <div className="ld-container">
            <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }} className="lesson-title-container" key={lesson.id}>
              <p className="lesson-title">{lesson.title}</p>
            </Link>
            <div className="lesson-desc1">
              <FontAwesomeIcon icon={faCaretLeft} className="desc-arrow" />
              <div className="lesson-desc">
                <p>{lesson.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Course;