import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import TimesheetEditor from "./components/timesheet-editor/TimesheetEditor";
import Appbar from "./components/AppBar";
import ProjectEditor from './components/project-editor/ProjectEditor';
import StatisticsAllUsers from './components/statistics/StatisticsAllUsers';
import Login from './components/auth/Login'
import StatisticsUser from './components/statistics/StatisticsUser';
import Logout from './components/auth/Logout';
import authService from './services/AuthService';
import JobEditor from './components/job-editor/JobEditor';
import UserEditor from './components/user-editor/UserEditor';

function App() {
  return (
    <div className="App">
      <Appbar/>
        {
          authService.getCurrentUser() ? (
            authService.isManagerCurrUser() ? (
              <Routes>
                <Route exact path="/" element={ <TimesheetEditor day={moment()} /> }/>
                <Route path="/projectEdit" element={<ProjectEditor/>} />
                <Route path="/jobEdit" element={<JobEditor/>} />
                <Route path="/userEdit" element={<UserEditor/>} />
                <Route path="/statisticsAllUsers" element={<StatisticsAllUsers/>} />
                <Route path="/statisticsUserByWeeks" element={<StatisticsUser/>} />
                <Route path="/logout" element={<Logout/>} />
              </Routes>
            ) : (
              <Routes>
                <Route exact path="/" element={ <TimesheetEditor day={moment()} /> }/>
                <Route path="/logout" element={<Logout/>} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route exact path="/" element={ <Login /> }/>
              <Route path="/logout" element={<Logout/>} />
            </Routes>
          )
        }
      
    </div>
  );
}

export default App;
