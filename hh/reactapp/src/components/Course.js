import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import Loading from "./Loading";
import "../styles/Course.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretLeft} from '@fortawesome/free-solid-svg-icons';

const Course = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(API_URL + `/api/Lesson/getCourseLessons/${courseId}`);
        setLessons(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="class-container">
        {lessons.map(lesson => (
          <div className="ld-container">
            <div className="lesson-title-container" key={lesson.id}>
              <p className="lesson-title">{lesson.title}</p>
            </div>
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