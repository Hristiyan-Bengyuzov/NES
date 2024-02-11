import "../styles/Forums.css";
import { useState, useEffect } from "react";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import Loading from "./Loading";

const Forums = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(API_URL + '/api/Thread/getMainThreads');
        setThreads(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching threads:', error);
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-forums">

    </div>
  );
}

export default Forums;