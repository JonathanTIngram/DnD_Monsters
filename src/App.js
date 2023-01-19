import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState } from 'react';

import MonsterList from './components/MonsterList'
import MonsterPage from './pages/MonsterPage'



function App() {

  
  return (

    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<MonsterList/>}/>
          <Route path="/monster" element={<MonsterPage monster={localStorage.getItem('val')}/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
