import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Forums from './pages/Forums.js';
import CoursesSection from './pages/CoursesSection.js';
import Options from './pages/Options.js';
import LogIn from './pages/LogIn.js';
import Register from './pages/Register.js';
import PBLessons from './pages/PBLessons.js';
import OOPLessons from './pages/OOPLessons.js';
import SQLLessons from './pages/SQLLessons.js';
import NoPage from './pages/NoPage.js';
import CoursePage from './pages/CoursePage.js';
import LessonInfo from './components/LessonInfo.js';
import ThreadForm from './components/ThreadForm.js';

const App = () => {
    // clears localstorage on launch
    // i'm honestly scared of this now
    useEffect(() => {
        localStorage.clear();
    }, []);
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forums" element={<Forums />} />
                    <Route path="/courses" element={<CoursesSection />} />
                    <Route path="/course/:courseId" element={<CoursePage />}></Route>
                    <Route path="/options" element={<Options />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/PBLessons" element={<PBLessons />} />
                    <Route path="/OOPLessons" element={<OOPLessons />} />
                    <Route path="/SQLLessons" element={<SQLLessons />} />
                    <Route path="/lesson/:lessonId" element={<LessonInfo />} />
                    <Route path="/threadTest" element={<ThreadForm />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;