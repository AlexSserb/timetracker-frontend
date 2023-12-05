import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import TimesheetEditor from "./components/timesheet-editor/timesheet-editor.component";
import Appbar from "./components/appbar.component";
import ProjectEditor from './components/project-editor/project-editor.component';
import StatisticsAllUsers from './components/statistics/statistics-all-users.component';
import Login from './components/auth/login.component'
import StatisticsUser from './components/statistics/statistics-user.component';
import Logout from './components/auth/logout.component';
import authService from './services/auth.service';
import JobEditor from './components/job-editor/job-editor.component';

function App() {
  return (
    <div className="App">
      <Appbar/>
        {
          authService.getCurrentUser() ? (
            <Routes>
              <Route exact path="/" element={ <TimesheetEditor day={moment()} /> }/>
              <Route path="/projectEdit" element={<ProjectEditor/>} />
              <Route path="/jobEdit" element={<JobEditor/>} />
              <Route path="/statisticsAllUsers" element={<StatisticsAllUsers/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/statisticsUserByWeeks" element={<StatisticsUser/>} />
              <Route path="/logout" element={<Logout/>} />
            </Routes>
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
