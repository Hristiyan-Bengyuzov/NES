import "../styles/Forums.css";
import { useState, useEffect } from "react";
import { API_URL } from "../common/GlobalConstants";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

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
      {threads.map(thread => (
        <div className="OP-container">
          <div className="name-date-container">
            <p className="forum-username">{thread.username}</p>
            <p>{thread.createdOn}</p>
            <p className="forum-thread-id">{thread.id}</p>
          </div>
          <div className="image-content-reply-container">
            <img src={thread.image}></img>
            <div className="content-reply-container">
              <p>{thread.content}</p>
              <p className="forum-replies">Отговори: {thread.replyCount}</p>
            </div>
          </div>
          <Link
            to={`/forum/${thread.id}`}
            className={`${thread.styles}`}
            style={{ textDecoration: 'none' }}
            key={thread.id}
          >
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Forums;