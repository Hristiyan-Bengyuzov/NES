import { useEffect, useState } from "react";
import { API_URL } from "../common/GlobalConstants";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Thread = () => {
    const { threadId } = useParams();
    const [threadInfo, setThreadInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchThreadInfo();
    }, []);


    if (loading) {
        return <Loading />;
    }

    return (
        <>
        </>
    );
}

export default Thread;