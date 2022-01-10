import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

import MonsterList from './components/MonsterList'


async function getAllMonsters () {


  //get data from textbox
  var challenge_rating = document.getElementById('challange_input').value
  var url = `https://api.open5e.com/monsters`
  var response = await fetch(url)
  var data = await response.json();
}

async function getByChallengeRating () {


  // while (data.next != null){

  // }
  let challenge_rating = document.getElementById("challange_input").value;

  var url = `https://api.open5e.com/monsters/?challenge_rating=${challenge_rating}`
  var response = await fetch(url)
  var data = await response.json();


  // for (let i = 0; i < data.results.length; i++){
  //     console.log(data.results[i].name, data.results[i].challenge_rating)
  //     document.getElementById("monsters").innerHTML = data.results[i].name
  // }

  
}


function App() {

  
  return (
    <div className="App">

    <MonsterList/>

    </div>
  );
}

export default App;
