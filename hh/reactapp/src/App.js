import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import CoursesSection from './pages/CoursesSection.js';
import About from './pages/About.js';
import LogIn from './pages/LogIn.js';
import Register from './pages/Register.js';
import PBLessons from './pages/PBLessons.js';
import OOPLessons from './pages/OOPLessons.js';
import SQLLessons from './pages/SQLLessons.js';
import NoPage from './pages/NoPage.js';
import CoursePage from './pages/CoursePage.js';
import LessonInfo from './components/LessonInfo.js';
import ThreadForm from './components/ThreadForm.js';
import ForumsPage from './pages/ForumsPage.js';
import Thread from './components/Thread.js';
import ThreadPage from './pages/ThreadPage.js';
import AdminMenu from './components/AdminMenu.js';
import Quiz from './components/Quiz.js';
import Unauthorized from './components/Unauthorized.js';

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forums" element={<ForumsPage />} />
                    <Route path="/courses" element={<CoursesSection />} />
                    <Route path="/course/:courseId" element={<CoursePage />}></Route>
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/PBLessons" element={<PBLessons />} />
                    <Route path="/OOPLessons" element={<OOPLessons />} />
                    <Route path="/SQLLessons" element={<SQLLessons />} />
                    <Route path="/lesson/:lessonId" element={<LessonInfo />} />
                    <Route path="/threadTest" element={<ThreadForm />} />
                    <Route path="/thread/:threadId" element={<ThreadPage />} />
                    <Route path="/admin" element={<AdminMenu />} />
                    <Route path="/test/:testId" element={<Quiz />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;