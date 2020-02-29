import React, { Component } from 'react'
import './App.css'

import { stateInit } from './states/stateInit'
import { stateTrap } from './states/stateTrap'

import base from './images/base.png'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      string: '',
      nextState: 'Init',
      img: base,
      unclickable: true,
      nextbutton: 'Start',
      looper: null
    }
    this.handleEnterClick = this.handleEnterClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleRestartClick = this.handleRestartClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
    this.handleAutoplayClick = this.handleAutoplayClick.bind(this)
    this.handleCharClick = this.handleCharClick.bind(this)

  }

  handleEnterClick() {
    this.handleRestartClick()
    this.setState({ 
      string: ' '+this.state.text,
      unclickable: false,
      nextbutton: 'Start'
    })
  }

  handleNextClick() {
    if(this.state.nextbutton === 'Restart'){
      this.handleRestartClick()
    }
    else{
      this.setState({ nextbutton: 'Next' })

      var presentChar = null

      if(this.state.string.length > 1) {
        presentChar = this.state.string.charAt(1).toUpperCase()
      }
      else if(this.state.string.length === 1){
        presentChar = ' '
      }
      else if(this.state.string.length === 0) {
        this.setState({ nextbutton: 'Restart' })
        return 0
      }

      this.setState({ string: this.state.string.substring(1) })
      
      // State Selector
      let outputFromState = null
      switch(this.state.nextState){
        case 'Init': {
          outputFromState = stateInit(presentChar)
          break
        }
        case 'Trap': {
          outputFromState = stateTrap(presentChar)
          break
        }
        default: {
          console.log('Something went wrong')
        }
      }
      
      this.setState({
        img: outputFromState[0],
        nextState: outputFromState[1]
      })
    }
  }

  handleRestartClick() {
    this.setState({
      string: ' '+this.state.text,
      nextState: 'Init',
      img: base,
      nextbutton: 'Start'
    })
    clearInterval(this.state.looper)
  }

  handleClearClick() {
    this.setState({
      text: '',
      string: '',
      nextState: 'Init',
      img: base,
      unclickable: true,
      nextbutton: 'Start',
    })
    clearInterval(this.state.looper)
  }

  handleAutoplayClick() {
    this.setState({looper: setInterval(() => this.handleNextClick(),1800)})
  }

  handleCharClick(char) {
    this.setState({ text: this.state.text + char })
  }

  render() {
    return (
      <div className="Layout-all">
        
        <div className="Layout-header">
          Finite Automata - Ticket Vending Machine
        </div>

        <div className="Layout-input">
          Input String:
          <input className="input" size="20" value={this.state.text}
            onChange={ (e)=>this.setState({text: e.target.value}) }/>

          <button className="enterbutton"
            onClick={ ()=>this.handleEnterClick() }>Enter
          </button>

          <button className="clearbutton"
            onClick={ ()=>this.handleClearClick() }>Clear
          </button>
          <div className="help">
            <button onClick={ ()=>this.handleCharClick('1') }>
              1 : Select Station 1
            </button>
            <button onClick={ ()=>this.handleCharClick('2') }>
              2 : Select Station 2
            </button>
            <button onClick={ ()=>this.handleCharClick('3') }>
              3 : Select Station 3
            </button>
            <button onClick={ ()=>this.handleCharClick('4') }>
              4 : Select Station 4
            </button>
            <button onClick={ ()=>this.handleCharClick('C') }>
              C : Insert 1 Coin
            </button>
          </div>
        </div>

        <div className="Layout-controller">
          <button className="nextbutton" onClick={ ()=>this.handleNextClick() } 
            disabled={this.state.unclickable}>{this.state.nextbutton}
          </button>
          
          <button className="autoplaybutton" onClick={ ()=>this.handleAutoplayClick() }
            disabled={this.state.unclickable}>Autoplay
          </button>

          <b className="string">&nbsp;-&gt;&nbsp;{this.state.string}</b>

        </div>

        <div className="Layout-body">
          <img src={ this.state.img } alt="img"/>
          <br/>Last Update: 29-Feb-2020 11:50PM
        </div>

      </div>
    );
  }
}

export default App;


//npm start
//npm run deploy