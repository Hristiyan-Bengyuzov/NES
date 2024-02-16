import React, { useState, useEffect } from 'react';
import { Card, Button, Radio } from 'antd';
import { API_URL } from '../common/GlobalConstants';
import axios from 'axios';
import Loading from './Loading';
import '../styles/Quiz.css';

const Quiz = () => {
    const [quizData, setQuizData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        const fetchTestInfo = async () => {
            try {
                const response = await axios.get(API_URL + `/api/Test/getTestInfo/1`);
                setQuizData(response.data);
                // Initialize selectedAnswers array with false for each question
                setSelectedAnswers(new Array(response.data.questions.length).fill(0));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
                setLoading(false);
            }
        };

        fetchTestInfo();
    }, []);

    const handleAnswerSelection = (questionIndex, answerIndex) => {
        // Create a copy of selectedAnswers and update the selected answer for the specific question
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[questionIndex] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
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
            <div className='quiz-button' onClick={() => console.log(selectedAnswers)}>
            &#62;Приключи теста&#60;
            </div>
        </div>
    );
};

export default Quiz;