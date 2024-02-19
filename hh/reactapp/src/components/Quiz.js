import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import { API_URL } from '../common/GlobalConstants';
import axios from 'axios';
import Loading from './Loading';
import '../styles/Quiz.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { getToken } from '../utilities/authorizationHelper';
import useReturnUrl from '../utilities/useReturnUrl.js'

const Quiz = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isCorrectArray, setIsCorrectArray] = useState([]);
    const { redirectToLoginIfNotAuth } = useReturnUrl();

    function getUserIdFromJwtPayload(jwt) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = atob(base64);
        const jsonPayload = JSON.parse(payload);
        return jsonPayload.userId;
    }

    useEffect(() => {
        const fetchTestInfo = async () => {
            try {
                const response = await axios.get(API_URL + `/api/Test/getTestInfo/${testId}`);
                setQuizData(response.data);
                setSelectedAnswers(new Array(response.data.questions.length).fill(0));
                setIsCorrectArray(new Array(response.data.questions.length).fill(false));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
                setLoading(false);
            }
        };

        fetchTestInfo();
    }, []);

    const handleAnswerSelection = (questionIndex, answerIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        const newIsCorrectArray = [...isCorrectArray];
        newSelectedAnswers[questionIndex] = answerIndex;
        newIsCorrectArray[questionIndex] = getIsCorrectValue(answerIndex);
        setSelectedAnswers(newSelectedAnswers);
        setIsCorrectArray(newIsCorrectArray);
    };

    const getIsCorrectValue = (answerId) => {
        for (const question of quizData.questions) {
            const answer = question.answers.find((ans) => ans.id === answerId);
            if (answer) {
                return answer.isCorrect;
            }
        }
        return false;
    };

    const handleTestPost = () => {
        if (!getToken()) {
            redirectToLoginIfNotAuth();
            return;
        }

        const points = isCorrectArray.filter(c => c).length;

        const payload = {
            userId: getUserIdFromJwtPayload(getToken()),
            testId: testId,
            points: points
        };

        Swal.fire({
            title: "Браво машина!",
            text: `Изкара ${points}/${quizData.questions.length}`,
            backdrop: "rgba(0,0,0,0.8)",
            background: "#000000 url(https://t3.ftcdn.net/jpg/01/02/64/28/360_F_102642850_Mca9lTRDH60DQin39YwCF5Jzd15lcdoo.jpg)",
            color: "#fff",
            iconColor: "#FF00FF",
            confirmButtonColor: "#ee4542"
        })
            .then(result => {
                if (result.isConfirmed || result.isDismissed) {
                    axios.post(API_URL + '/api/TestResult/createTestResult', payload)
                        .then(response => console.log(response.data));
                    navigate('/courses');
                }
            });
    };


    if (loading) {
        return <Loading />;
    }

    return (
        <div className='quiz-container'>
            <div className='quiz-title'>{quizData.title}</div>
            {quizData.questions.map((question, questionIndex) => (
                <div key={question.id} className='qstn-container'>
                    <p>{question.content}</p>
                    <Radio.Group
                        onChange={(e) => handleAnswerSelection(questionIndex, e.target.value)}
                        value={selectedAnswers[questionIndex]}
                    >
                        {question.answers.map((answer) => (
                            <Radio key={answer.id} value={answer.id} className='radio-test'>
                                {answer.content}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            ))}
            <div className='quiz-button' onClick={handleTestPost}>
                &#62;Приключи теста&#60;
            </div>
        </div>
    );
};

export default Quiz;