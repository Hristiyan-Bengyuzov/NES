import { useState, useEffect } from "react";
import { API_URL } from "../common/GlobalConstants";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import CodeSnippet from "./CodeSnippet";

const LessonInfo = () => {
    const [lessonInfo, setLessonInfo] = useState({});
    const { lessonId } = useParams();
    const [loading, setLoading] = useState(true);
    const [snippet, setSnippet] = useState('');

    const handleSnippetChange = (snippet) => {
        setSnippet(snippet);
    }

    useEffect(() => {
        const fetchLessonInfo = async () => {
            try {
                const response = await axios.get(API_URL + `/api/Lesson/getLessonInfo/${lessonId}`);
                setLessonInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lesson info:', error);
                setLoading(false);
            }
        }

        fetchLessonInfo();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <h1>{lessonInfo.title}</h1>
            {lessonInfo.paragraphs.map(paragraph => {
                return (
                    <>
                        <h1>{paragraph.content}</h1>
                        {
                            paragraph.codeSnippets.map(snippet => {
                                return (
                                    <li key={snippet.id}>
                                        <button onClick={() => handleSnippetChange(snippet)}>{snippet.language}</button>
                                    </li>
                                )
                            })
                        }
                        <CodeSnippet language={snippet.language} code={snippet.code} />
                    </>
                )
            })}
        </>
    );
}

export default LessonInfo;