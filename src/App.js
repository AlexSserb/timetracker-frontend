import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import DayEditor from "./components/DayEditor";
import Appbar from "./components/Appbar";
import ProjectEditor from './components/ProjectEditor';


function App() {
  return (
    <div className="App">
      <Appbar/>
      <Routes>
        <Route exact path="/" element={<DayEditor day={moment()}/>} />
        <Route path="/projectEdit" element={<ProjectEditor/>} />
      </Routes>
    </div>
  );
}

export default App;
