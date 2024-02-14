import { useEffect, useState } from "react";
import { API_URL } from "../common/GlobalConstants";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import "../styles/Thread.css";
import ThreadForm from "./ThreadForm.js";

const Thread = () => {
    const { threadId } = useParams();
    const [threadInfo, setThreadInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchThreadInfo = async () => {
        try {
            const response = await axios.get(API_URL + `/api/Thread/getThreadInfo/${threadId}`);
            console.log(response.data);
            setThreadInfo(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching threads:', error);
            setLoading(false);
        }
    };

    const handleReply = () => {
       fetchThreadInfo();
    };

    useEffect(() => {
        fetchThreadInfo();
    }, []);


    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="GIANT-THREAD-CONTAINER">
                <div className="entire-thread-container">
                    <div className="OP-container-in-thread">
                        <div className="name-date-container-in-thread">
                            <p className="forum-username">{threadInfo.username}</p>
                            <p>{threadInfo.createdOn}</p>
                            <p className="forum-thread-id">{threadInfo.id}</p>
                        </div>
                        <div className="image-content-reply-container-in-thread">
                            <img src={threadInfo.image}></img>
                            <div className="content-reply-container-in-thread">
                                <p>{threadInfo.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="replies">
                        {threadInfo.replies.map(reply => (
                            <div className="OP-container1">
                                <div className="name-date-container">
                                    <p className="forum-username">{reply.username}</p>
                                    <p>{reply.createdOn}</p>
                                    <p className="forum-thread-id">{reply.id}</p>
                                </div>
                                <div className="image-content-reply-container">
                                    <img src={reply.image}></img>
                                    <div className="content-reply-container2">
                                        <p>{reply.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="poopandfart">
                    <ThreadForm parentId={threadId} buttonShow={false} onReply={handleReply} />
                </div>
            </div>
        </>
    );
}

export default Thread;