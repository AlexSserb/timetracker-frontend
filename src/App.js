import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import DayEditor from "./components/DayEditor";
import Appbar from "./components/Appbar";


function App() {
  return (
    <div className="App">
      <Appbar/>
      <Routes>
        <Route exact path="/" element={<DayEditor day={moment()}/>} />
        <Route path="/userEdit" element={<h1>TODO редакт пользователей</h1>} />
      </Routes>
    </div>
  );
}

export default App;
