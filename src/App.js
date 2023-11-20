import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import TimesheetEditor from "./components/timesheet-editor/timesheet-editor.component";
import Appbar from "./components/appbar.component";
import ProjectEditor from './components/project-editor/project-editor.component';
import Statistics from './components/statistics/statistics.component';
import Profile from './components/profile/profile.component';
import Login from './components/auth/login.component'

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
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
