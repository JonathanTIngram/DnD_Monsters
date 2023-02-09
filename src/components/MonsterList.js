import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Router, Route, useNavigate, Link} from 'react-router-dom';
import styled from 'styled-components';
import MonsterPage from '../pages/MonsterPage';


export const NavLink = styled(Link)`
  text-decoration : none;
  
  opacity : 60%;
  &:hover {
    color : pink;
  }
  button {
    &:hover {
        text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 20px #fff,
        0 0 80px #0ff,
        0 0 160px #0ff,
        0 0 180px #0ff,
        0 0 200px #0ff,
        0 0 300px #0ff;
    }
    border-radius : 5%;
    size : 100%;
    width : 20%;
    height: 50%;
    padding-bottom : 1%;
  }
`


var monsters = []
let nextId = 0;

let mon = []

var MonsterList = () => {

    const navigate = useNavigate();

    const navigateToMonster = () => {
        // 👇️ navigate to /contacts
        navigate('/MonsterPage');
    };

    var [challengeRating, setChallengeRating] = useState('');
    var [updatedChallengeRating, setUpdatedChallengeRating] = useState(challengeRating);

    var [monsterList, setMonsterList] = useState([]);
    var [updatedMonsterList, setUpdatedMonsterList] = useState([]);


    const handleChallengeRating = (event) => {
        setChallengeRating(event.target.value)
    }

    const updateMonsters = () => {
        setUpdatedMonsterList(monsterList)
        getChallenge(challengeRating)
    }

    const handleClick = () => {
        setUpdatedChallengeRating(challengeRating)
        updateMonsters();
    }

    //https://5e.tools/audio/bestiary/dryad.mp3

    var getChallenge = (challenge) => {


        let url = `https://raw.githubusercontent.com/5etools-mirror-1/5etools-mirror-1.github.io/master/data/bestiary/bestiary-mm.json`

        axios.get(url)
        .then(res => {
            
            // this.setState( { monsters: res.data.results }, () => {
            //     console.log(this.monsters)
            // })
            setMonsterList([])
            for (let i = 0; i <= res.data.monster.length; i++){
                if(res.data.monster[i].cr == challenge){

                    // console.log(`Monster: ${res.data.monster[i].name}, Challenge Rating: ${res.data.monster[i].cr}`)
                    mon.push({val: res.data.monster[i]})
                    setMonsterList((monsterList) => [
                        ...monsterList,
                        {val: res.data.monster[i]}
                    ])
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    mon = []

    let showPage = (val) => {
        console.log(val)
        return (
            <>
                
                <MonsterPage monster={val}/>
            </>
        )

    }


//   componentDidMount() {
//     if(this.challengeRating != null){
//         axios.get(`https://api.open5e.com/monsters/?challenge_rating=${this.challengeRating}`)
//         .then(res => {
//           const monsters = res.data;
//           this.setState({ monsters });
//         })
//     }
//   }

    return (

        <>
        {/* <Router>
            <NavLink to="/">
              <button class="btn btn-primary">
                Home
              </button>
            </NavLink>

          <NavLink to="/Monster">
            <button class="btn btn-primary">
                Monster
            </button>
          </NavLink>


            <Route path="/Monster"  component={MonsterPage} />
            <Route path="/"  component={MonsterList} />

        </Router> */}

            <h1 style={{paddingTop: "5%"}}>Get ready to face some fierce foes, dungeon masters!</h1>
            <p style={{marginLeft: "30%", marginRight: "30%"}}>
            D&D monsters are just a <a style={{textDecoration: "none"}} href="https://youtu.be/OX3Ykju0jT8" target="_blank"><b style={{color: "maroon"}}>Challenge Rating</b></a> away. Monster manual? 
            Nah, we've got you covered. Search by CR, pick your poison, and unleash chaos on your players.
            </p>

            <label>Select a Challenge Rating:</label>
            <div id="numSelect" style={{paddingTop: "5%"}}>
                <select class="form-select" style={{backgroundColor: "#303030", textAlign: "left", color: "white"}} onChange={handleChallengeRating}>
                        <option>1/8</option>
                        <option>1/4</option>
                        <option>1/2</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                </select>
            </div>
            {/* <input onChange={handleChallengeRating}/> */}
            <br/>
            <br/>

            <button type="button" className="btn btn-primary" onClick={updateMonsters}>Get Monster</button>


            <br/>
            <br/>
        <div id="monsterSection">

            {monsterList.map((data, key) => {
                // console.log(val[key].name, val[key].cr)
                let val = data.val
                let count = 0;
                return ( 
                    <Link to="/monster" onClick={() => {
                        // console.log(val)
                        localStorage.clear();

                        localStorage.setItem('monster', JSON.stringify(val))

                    }}>
                        <div style={{marginLeft: "13%"}}>
                            <div className="card border-primary mb-3" id="monsterCard" style={{float: "left", marginLeft: "1%"}}>
                                <div class="card-header" style={{fontSize: "80%"}}>{val.name}</div>
                                <div class="card-body" style={{padding: "0%"}}>
                                    <h4 class="card-title">
                                        HP: {val.hp.formula}
                                    </h4>
                                    <img src={`https://5e.tools/img/MM/${val.name}.png`} style={{width: "90%"}}/>
                                    <p class="card-text">
                                        STR: {val.str}&nbsp;
                                        DEX: {val.dex}&nbsp;
                                        CHA: {val.cha}&nbsp;
                                        INT: {val.int}&nbsp;
                                        WIS: {val.wis}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </Link>
                )

            })}

      </div>

      </>


    )
}

export default MonsterList;