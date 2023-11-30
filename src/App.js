import './App.css';
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import moment from 'moment';

import TimesheetEditor from "./components/timesheet-editor/timesheet-editor.component";
import Appbar from "./components/appbar.component";
import ProjectEditor from './components/project-editor/project-editor.component';
import StatisticsAllUsers from './components/statistics/statistics-all-users.component';
import Login from './components/auth/login.component'
import StatisticsUser from './components/statistics/statistics-user.component';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Routes>
        <Route exact path="/" element={
          <TimesheetEditor day={moment()} userId={"58162a1e-b7a4-4a15-8852-5aee1e4b4833"}/>
        }/>
        <Route path="/projectEdit" element={<ProjectEditor/>} />
        <Route path="/statisticsAllUsers" element={<StatisticsAllUsers/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/statisticsUserByWeeks" element={<StatisticsUser/>} />
      </Routes>
    </div>
  );
}

export default App;
