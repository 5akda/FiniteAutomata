import React, { useState, Component } from 'react'
import './App.css'

import base from './images/base.png'

import s11 from './images/s1-1.png'
import s12 from './images/s1-2.png'
import s13 from './images/s1-3.png'
import s1c from './images/s1-c.png'
import s1empty from './images/s1-empty.png'

import s21 from './images/s2-1.png'
import s22 from './images/s2-2.png'
import s23 from './images/s2-3.png'
import s2c from './images/s2-c.png'
import s2empty from './images/s2-empty.png'

import s31 from './images/s3-1.png'
import s32 from './images/s3-2.png'
import s33 from './images/s3-3.png'
import s3c from './images/s3-c.png'
import s3empty from './images/s3-empty.png'

import init1 from './images/init-1.png'
import init2 from './images/init-2.png'
import init3 from './images/init-3.png'
import initc from './images/init-c.png'
import initempty from './images/init-empty.png'

import trap123c from './images/trap-123c.png'
import trapempty from './images/trap-empty.png'

import more2coins123 from './images/2more-123.png'
import more2coinsc from './images/2more-c.png'
import more2coinsempty from './images/2more-empty.png'

import more1coins123 from './images/1more-123.png'
import more1coinsc from './images/1more-c.png'
import more1coinsempty from './images/1more-empty.png'

import done1 from './images/done-1.png'
import done2 from './images/done-2.png'
import done3 from './images/done-3.png'
import donec from './images/done-c.png'
import doneempty from './images/done-empty.png'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      string: '',
      reader: '',
      nextState: 's_init',
      stepCount: 0,
      img: base,
      unclickable: true
    }
  }

  handleEnterClick(){
    this.handleRestartClick()
    this.setState({ 
      string: this.state.text,
      unclickable: false,
     })
  }

  handleNextClick(){
    if(this.state.stepCount < this.state.string.length) {
      let presentChar = this.state.string.charAt(this.state.stepCount)
      switch(this.state.nextState){
        case 's_init': {
          this.s_init(presentChar)
          break
        }
        case 's_trap': {
          this.s_trap(presentChar)
        }
      }
      this.setState({
        stepCount: this.state.stepCount+1,
        reader: this.state.reader + '^'
      })
    }

    else if(this.state.stepCount == this.state.string.length) {
      let end = ''
      switch(this.state.nextState){
        case 's_init': {
          this.s_init(end)
          break
        }
        case 's_trap': {
          this.s_trap(end)
        }
      }
      this.setState({
        stepCount: this.state.stepCount+1,
        reader: this.state.reader + '^'
      })
    }
  }

  handleRestartClick(){
    this.setState({
      reader: '',
      nextState: 's_init',
      stepCount: 0,
      img: base,
    })
  }

  handleClearClick(){
    this.setState({
      text: '',
      string: '',
      reader: '',
      nextState: 's_init',
      stepCount: 0,
      img: base,
      unclickable: true
    })
  }

  s_init(nextChar) {
    switch(nextChar) {
      case '1': {
        this.setState({ img: init1, nextState: 's_station1' })
        break
      }
      case '2': {
        this.setState({ img: init2, nextState: 's_station2' })
        break
      }
      case '3': {
        this.setState({ img: init3, nextState: 's_station3' })
        break
      }
      case ' ': {
        this.setState({ img: initempty })
        break
      }
      default: {
        this.setState({ img: initc, nextState: 's_trap' })
        break
      }

    }
  }

  s_trap(nextChar) {
    switch(nextChar) {
      case '1': case '2': case '3': case 'C': {
        this.setState({ img: trap123c })
        break
      }
      default: {
        this.setState({ img: trapempty })
        break
      }
    }
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
            onChange={(e)=>this.setState({text: e.target.value})}/>

          <button className="enterbutton"
            onClick={()=>this.handleEnterClick()}>Enter
          </button>

          <button className="clearbutton"
            onClick={()=>this.handleClearClick()}>Clear
          </button>
        </div>

        <div className="Layout-controller">
          <b className="string">{this.state.string}</b>

          <button className="nextbutton" onClick={()=>this.handleNextClick()} 
            disabled={this.state.unclickable}>Next
          </button>
          
          <button className="restartbutton"
            disabled={this.state.unclickable}>Autoplay
          </button>

          <button className="restartbutton" onClick={()=>this.handleRestartClick()}
            disabled={this.state.unclickable}>Restart
          </button>

          <br/>
          <b className="reader">{this.state.reader}</b>
        </div>

        <div className="Layout-body">
          <img src={this.state.img} alt="img"/>
        </div>

      </div>
    );
  }
}

export default App;


//npm start
//npm run deploy