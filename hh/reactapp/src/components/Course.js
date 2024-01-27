import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import Loading from "./Loading";

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
      {lessons.map(lesson => (
        <div key={lesson.id}>
          <p>{lesson.title}</p>
          <p>{lesson.description}</p>
        </div>
      ))}
    </>
  );
}

export default Course;