import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import TimesheetEditor from "./components/TimesheetEditor/TimesheetEditor";
import Appbar from "./components/Appbar";
import ProjectEditor from './components/ProjectEditor/ProjectEditor';
import Statistics from './components/Statistics/Statistics';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Routes>
        <Route exact path="/" element={
            <TimesheetEditor day={moment()} userId={"58162a1e-b7a4-4a15-8852-5aee1e4b4833"}/>
        }/>
        <Route path="/projectEdit" element={<ProjectEditor/>} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
