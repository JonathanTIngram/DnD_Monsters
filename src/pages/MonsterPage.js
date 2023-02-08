import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, useNavigate, Link} from 'react-router-dom';

let removeCurly = /[{}]/g
let removeBracket = /[\[\]']+/g
let condition = /[A-Za-z0-9]+/g


var MonsterPage = (props) => {

    let monster = localStorage.getItem('monster');
    monster = JSON.parse(monster)
    var [renderError, setRenderError] = useState(null);
    var [immunityError, setImmunityError] = useState({error: null});

    console.log(monster)


    let renderActions = () => {
        try {
            if (monster.action) {
                return (
                    <div>
                    <ul>
                    Actions: 
                    {   
                        Object.entries(monster.action).map((item, key) => {
                            var re = /[^0-9](?=[0-9])/g;
                            console.log("Name ", item[1].name, " Entry ", JSON.stringify(item[1].entries).replace(re, '$& '))
                            return (
                                <>
                                    <li key={key}><b style={{color: "maroon"}}>{JSON.stringify(item[1].name.replace(removeCurly, '').replace('@recharge', '- recharge'))}</b></li>
                                    <li style={{paddingRight: "5%"}} key={key}>{JSON.stringify(item[1].entries[0]).replace(re, '$& ').replace("@atk mw", "Weapon Attack").replace("@hit", "").replace(removeCurly, '').replace('@condition', '').replace('@h', '').replace('@damage', 'damage').replace('@dc', 'DC')}</li>
                                </>
                            )
                        })
                    }
                    </ul>
                    </div>
                )
            }
        }
        catch (error) {
            console.log(error)
            setRenderError(error)
            return (
                <></>
            )
        }
    }


    let renderLanguages = () => {
        try {
            if(monster.languages) {
                return (
                    <div>
                    <ul>
                    Speech: 
                    {   
                        Object.entries(monster.languages).map((item) => {
                            return (
                                <>
                                    <li>- {item.splice(1)}</li>
                                </>
                            )
                        })
                    }
                    </ul>
                    </div>
                )
            }
        }
        catch (error) {
            console.log(error)
            setRenderError(error)
            return (
                <></>
            )
        }

    }


    let renderAC = () => {
        console.log('ac is render ', typeof(monster.ac[0]))
        // console.log('from' in monster.ac[0])

        // return (
        //     <h2>AC: {monster.ac[0].ac} - {monster.ac[0].from[0].replace("{", "").replace("}", "").replace("@", "utilizing ").split("|")[0]}</h2>
        // )
        try {
            if(monster.ac) {
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
        }
        catch (error) {
            console.log(error)
            setRenderError(error)
            return (
                <></>
            )
        }
    }

    let renderSpeed = () => {
        try {
            if(monster.speed) {
                return (
                    <div>
                    <ul>
                        Movement Speeds: 
                    {   
                        Object.entries(monster.speed).map((item, key) => {
                            var re = /[^0-9](?=[0-9])/g;
                            return (
                                <li key={key}>{JSON.stringify(item).replace(re, '$& ').replace('[', '').replace(']', '').replace(/"|'/g, '').replace(',', ":").replace('canHover:true', 'Can Hover')}</li>
                            )
                        })
                    }
                    </ul>
                    </div>
                )
            }
        }
        catch (error){
            console.log(error);
            setRenderError(error);
            return (
                <></>
            )
        }
    }

    let renderSaves = () => {
        try {
            if(monster.save) {
                return (
                    <div>
                    <ul>
                        Saving Throws: 
                    {   
                        Object.entries(monster.save).map((item, key) => {
                            var re = /[^0-9](?=[0-9])/g;
                            return (
                                <li key={key}>{JSON.stringify(item).replace(re, '$& ').replace('[', '').replace(']', '').replace(/"|'/g, '').replace(',', ":").replace('canHover:true', 'Can Hover')}</li>
                            )
                        })
                    }
                    </ul>
                    </div>
                )
            }
        }
        catch (error){
            console.log(error);
            setRenderError(error);
            return (
                <></>
            )
        }
    }

    let renderSenses = () => {
        try {
            if (monster.senses) {
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
        }
        catch (error){
            console.log(error);
            setRenderError(error);
            return (
                <></>
            )
        }
    }

    let renderImmunity = () => {
        console.log(monster)
        try {
            if(monster.immune) {
                return (
                    <div>
                    <ul>
                        Immune to:
                    {
                        monster.immune.map((item, key) => {
                            var re = /[^0-9](?=[0-9])/g;
                            item = JSON.stringify(item).replace(',', ':').replace(/"|'/g, '').replace(re, '$& ').replace(removeCurly, '').replace(removeBracket, '').replace('"immune"', '')
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
        }
        catch (error){
            console.log(error);
            setImmunityError(error);
            return (
                <></>
            )
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

        {monster.save &&
            renderSaves()
        }
        {monster.immunity &&
            renderImmunity()
        }
        {monster.senses &&
            renderSenses()
        }
        {monster.speed &&
            renderSpeed()
        }
        {monster.languages &&
            renderLanguages()
        }
        {monster.action &&
            renderActions()
        }
        {/* {renderImmunity()} */}
        {/* {renderSenses()} */}
        {/* {renderSpeed()} */}
        {/* {renderLanguages()} */}
        {/* {renderActions()} */}

        <div>
            
        </div>
        </>
    );
    

}

export default MonsterPage;