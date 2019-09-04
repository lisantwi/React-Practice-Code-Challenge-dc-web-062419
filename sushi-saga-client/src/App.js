import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"



class App extends Component {

  constructor(){
    super()
    this.state = {
      sushis: [],
      sushiIndex: 0,
      eatenSushi: [],
      budget: 100
    }
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        sushis: data
      })
    })
  }

  renderSushi = () => this.state.sushis.slice(this.state.sushiIndex,this.state.sushiIndex + 4)

  eatSushi = (sushi) => {
    if (this.state.budget >= sushi.price){
      if (!this.state.eatenSushi.includes(sushi)){
        this.setState({
          eatenSushi: [...this.state.eatenSushi, sushi],
          budget: this.state.budget - sushi.price
        })
      }
    }
   
   
  }
  
  nextSushi = () => {
    this.setState({
      sushiIndex: this.state.sushiIndex + 4
    })
  }

  render() {
    const { sushiIndex, eatenSushi} = this.state
    return (
      <div className="app">
        <SushiContainer sushis={this.renderSushi()}  sushiIndex={sushiIndex} nextSushi={this.nextSushi} eatSushi={this.eatSushi} eatenSushi={eatenSushi} />
        <Table eatenSushi={eatenSushi} budget={this.state.budget} />
      </div>
    );
  }
}

export default App;