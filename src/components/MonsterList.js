import React from 'react';
import axios from 'axios';

var monsters = []

export default class MonsterList extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            challengeRating: 0,
        };



        this.handleChallengeRating = this.handleChallengeRating.bind(this)
        this.getChallenge = this.getChallenge.bind(this)
    }




  handleChallengeRating = event => {
      this.setState( { challengeRating: event.target.value })
      console.log(event.target.value)


      this.getChallenge(event.target.value)
  }




getChallenge (challenge) {


    let url = `https://raw.githubusercontent.com/5etools-mirror-1/5etools-mirror-1.github.io/master/data/bestiary/bestiary-mm.json`

    axios.get(url)
    .then(res => {
        
        // this.setState( { monsters: res.data.results }, () => {
        //     console.log(this.monsters)
        // })

        for (let i = 0; i <= res.data.monster.length; i++){
            if(res.data.monster[i].cr == challenge){
                console.log(`Monster: ${res.data.monster[i].name}, Challenge Rating: ${res.data.monster[i].cr}`)
                monsters.push(res.data.monster)
            }
            
        }




    })
    .catch(err => {
        console.log(err)
    })


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

  render() {
      
    return (

        <>
    
        <div>
        
            <h1>Challenge Rating:</h1>


            <input onChange={ this.handleChallengeRating}/>
            <br/>
            <br/>

            <button type="button" class="btn btn-primary" onClick={ this.getChallenge }>Get Monster</button>


            <br/>
            <br/>

            {monsters.map((val, key) => {
                console.log(val[key].name, val[key].cr)

                return ( 
                    <div style={{marginLeft: "5%"}}>
                        <div class="card border-primary mb-3" style={{width: "30%", float: "left", marginLeft: "1%"}}>
                            <div class="card-header">{val[key].name}</div>
                            <div class="card-body">
                                <h4 class="card-title">Top Text</h4>
                                <img src={`https://5e.tools/img/MM/${val[key].name}.png`} style={{width: "40%"}}/>
                                <p class="card-text">Bottom Text</p>
                            </div>

                        </div>
                    </div>
                )

            })}

            <p style={{fontSize: "45%", marginTop: "10%"}}>Made by Jonathan Ingram</p>

      </div>

      </>


    )
  }
}