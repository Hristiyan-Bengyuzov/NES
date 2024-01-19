import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Forums from './pages/Forums.js';
import LessonSections from './pages/LessonSections.js';
import Options from './pages/Options.js';
import LogIn from './pages/LogIn.js';
import Register from './pages/Register.js';
import PBLessons from './pages/PBLessons.js';
import OOPLessons from './pages/OOPLessons.js';
import SQLLessons from './pages/SQLLessons.js';
import NoPage from './pages/NoPage.js';

const App = () => {
    // clears localstorage on launch
    useEffect(() => {
        localStorage.clear();
      }, []);

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/forums" element={<Forums/>}/>
                <Route path="/lessonSections" element={<LessonSections/>}/>
                <Route path="/options" element={<Options/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/PBLessons" element={<PBLessons/>}/>
                <Route path="/OOPLessons" element={<OOPLessons/>}/>
                <Route path="/SQLLessons" element={<SQLLessons/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
      );
}
 
export default App;