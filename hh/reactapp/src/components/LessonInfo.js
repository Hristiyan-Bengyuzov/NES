import { useState, useEffect } from "react";
import { API_URL } from "../common/GlobalConstants";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import CodeSnippet from "./CodeSnippet";
import "../styles/LessonInfo.css";

const LessonInfo = () => {
    const [lessonInfo, setLessonInfo] = useState({});
    const { lessonId } = useParams();
    const [loading, setLoading] = useState(true);

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

    const logoMap = {
        csharp: 'csharplogo.png',
        java: 'javalogo.png',
        sql: 'sqllogo.png'
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="titlecard">{lessonInfo.title}</div>
            <div className="paragraphs-container">
                {lessonInfo.paragraphs.map(paragraph => {
                    return (
                        <>
                            <div className="lesson-paragraph">{paragraph.content}</div>
                            {
                                paragraph.codeSnippets.map(snippet => {
                                    return (
                                        <div className="snippets-container">
                                            <div className="SNIPPET-container">
                                                <div className="logo">
                                                    <img src={require(`../images/${logoMap[snippet.language]}`)} alt="" className="logo" />
                                                </div>
                                                <div className="snippet" key={snippet.id}>
                                                    <CodeSnippet language={snippet.language} code={snippet.code} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
                })}
            </div>
            <iframe className="lesson-video" width="560" height="315" src={lessonInfo.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"></iframe>
        </>
    );
}

export default LessonInfo;