import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import moment from 'moment';

import DayEditor from "./components/DayEditor/DayEditor";
import Appbar from "./components/Appbar";
import ProjectEditor from './components/ProjectEditor/ProjectEditor';
import Statistics from './components/Statistics/Statistics';
import Profile from './components/Profile/Profile';
import Login from './components/Authentication/Login';
import RequireAuth from './components/Authentication/RequireAuth';
import Userfront from '@userfront/toolkit';

Userfront.init('demo1234');

function App() {
  return (
    <div className="App">
      <Appbar/>
      <Routes>
        <Route exact path="/" element={
            <DayEditor day={moment()} userId={"58162a1e-b7a4-4a15-8852-5aee1e4b4833"}/>
        }/>
        <Route path="/projectEdit" element={<ProjectEditor/>} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <Appbar/>
//       <Routes>
//         <Route exact path="/" element={
//           <RequireAuth>
//             <DayEditor day={moment()} userId={"58162a1e-b7a4-4a15-8852-5aee1e4b4833"}/>
//           </RequireAuth>}
//         />
//         <Route path="/projectEdit" element={<RequireAuth><ProjectEditor/></RequireAuth>} />
//         <Route path="/statistics" element={<RequireAuth><Statistics/></RequireAuth>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/profile" element={<RequireAuth><Profile/></RequireAuth>} />
//       </Routes>
//     </div>
//   );
// }

export default App;
