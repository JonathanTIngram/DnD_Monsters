import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, useNavigate, Link} from 'react-router-dom';

var MonsterPage = (props) => {

    let monster = localStorage.getItem('monster');
    monster = JSON.parse(monster)

    console.log(monster)


    let renderAC = () => {
        console.log('ac is render ', typeof(monster.ac[0]))
        // console.log('from' in monster.ac[0])

        // return (
        //     <h2>AC: {monster.ac[0].ac} - {monster.ac[0].from[0].replace("{", "").replace("}", "").replace("@", "utilizing ").split("|")[0]}</h2>
        // )
        try {
            if(!isNaN(monster.ac[0])){
                return (
                    <h2>AC: {monster.ac[0]}</h2>
                )
            }
            else {
                if (typeof monster.ac == "object") {
                    if ('from' in monster.ac[0]) {
                        return (
                            <h2>AC: {monster.ac[0].ac} - {monster.ac[0].from[0].replace("{", "").replace("}", "").replace("@", "utilizing ").split("|")[0]}</h2>
                        )
                    }
                }
                else if (typeof monster.ac != "object") {
                    return(
                        <h2>AC: {monster.ac}</h2>
                    )
                }
                else if (Array.isArray(monster.ac)) {
                    return(
                        <h2>AC: {monster.ac[0]}</h2>
                    )
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    let renderSpeed = () => {
        try {
            return (
                <div>
                <ul>
                    Movement Speeds: 
                {   
                    Object.entries(monster.speed).map((item, key) => {
                        var re = /[^0-9](?=[0-9])/g;
                        return (
                            <li key={key}>{JSON.stringify(item).replace(re, '$& ').replace('[', '').replace(']', '').replace(/"|'/g, '').replace(',', ":")}</li>
                        )
                    })
                }
                </ul>
                </div>
            )
        }
        catch (error){
            console.log(error);
        }
    }

    let renderSenses = () => {
        try {
            return (
                <div>
                <ul>
                    Senses: 
                {
                    monster.senses.map((item, key) => {
                        return (
                            <>
                                <li>- {item}</li>
                            </>
                        )
                    })
                }
                </ul>
                </div>
            )
        }
        catch (error){
            console.log(error);
        }
    }

    let renderImmunity = () => {
        try {
            return (
                <div>
                <ul>
                    Immune to:
                {
                    monster.immune.map((item, key) => {
                        return (
                            <>
                                <li>- {item}</li>
                            </>
                        )
                    })
                }
                </ul>
                </div>
            )
        }
        catch (error){
            console.log(error);
        }
    }
    return (
        <>
        <div style={{position: "relative", right: "30%", paddingTop: "1%"}}>
        <button type="button" className="btn btn-primary" style={{martinLeft: "1000px"}} onClick={() => {
                            window.location.assign("/")
            }}>Go Back</button>
        </div>
        <div>
            
            <div>
                <h1>{monster.name}</h1>
                <img src={`https://5e.tools/img/MM/${monster.name}.png`} style={{width: "40%"}}/>
            </div>

            <div>
                <h1>Stats</h1>
        <h2 style={{fontSize: "140%"}}>
        </h2>

        <h2>HP: {monster.hp.formula} <br/></h2>
        {renderAC()}
        {/* {typeof monster.ac == "object" &&
            <h2>AC: {monster.ac[0].ac} - {monster.ac[0].from[0].replace("{", "").replace("}", "").replace("@", "utilizing ").split("|")[0]}</h2>
        }

        {typeof monster.ac != "object" &&
            <h2>AC: {monster.ac}</h2>
        } */}
        {/* {() => 
            {
                console.log(monster.ac)
                if (typeof monster.ac != "object") {
                    return (
                        <h2>AC: {monster.ac}</h2>
                    );
                }
                else {
                    <h2>AC: {monster.ac[0].ac} - {monster.ac[0].from}</h2>
                }
            }

        } */}
                <p>Dexterity: {monster.dex}</p>
                <p>Strength: {monster.str}</p>
                <p>Charisma: {monster.cha}</p>
                <p>Inteligence: {monster.int}</p>
                <p>Widsom: {monster.wis}</p>
            </div>
        </div>

        {renderImmunity()}

        {renderSenses()}

        {renderSpeed()}

        <div>
            
        </div>
        </>
    );
    

}

export default MonsterPage;