import React, { Component } from 'react'
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

import more1coin123 from './images/1more-123.png'
import more1coinc from './images/1more-c.png'
import more1coinempty from './images/1more-empty.png'

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
      nextState: 's_init',
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
      switch(this.state.nextState){
        case 's_init': {
          this.s_init(presentChar)
          break
        }
        case 's_trap': {
          this.s_trap(presentChar)
          break
        }
        case 's_station1': {
          this.s_station1(presentChar)
          break
        }
        case 's_station2': {
          this.s_station2(presentChar)
          break
        }
        case 's_station3': {
          this.s_station3(presentChar)
          break
        }
        case 's_done': {
          this.s_done(presentChar)
          break
        }
        case 's_2morecoins': {
          this.s_2morecoins(presentChar)
          break
        }
        case 's_1morecoin': {
          this.s_1morecoin(presentChar)
          break
        }
      }
    }
  }

  handleRestartClick() {
    this.setState({
      string: ' '+this.state.text,
      nextState: 's_init',
      img: base,
      nextbutton: 'Start'
    })
    clearInterval(this.state.looper)
  }

  handleClearClick() {
    this.setState({
      text: '',
      string: '',
      nextState: 's_init',
      img: base,
      unclickable: true,
      nextbutton: 'Start',
    })
    clearInterval(this.state.looper)
  }

  handleAutoplayClick() {
    this.setState({looper: setInterval(() => this.handleNextClick(),1800)})
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

  s_station1(nextChar) {
    switch(nextChar) {
      case '1': {
        this.setState({ img: s11 })
        break
      }
      case '2': {
        this.setState({ img: s12, nextState: 's_station2' })
        break
      }
      case '3': {
        this.setState({ img: s13, nextState: 's_station3' })
        break
      }
      case ' ': {
        this.setState({ img: s1empty })
        break
      }
      default: {
        this.setState({ img: s1c, nextState: 's_done' })
        break
      }
    }
  }

  s_station2(nextChar) {
    switch(nextChar) {
      case '1': {
        this.setState({ img: s21, nextState: 's_station1' })
        break
      }
      case '2': {
        this.setState({ img: s22 })
        break
      }
      case '3': {
        this.setState({ img: s23, nextState: 's_station3' })
        break
      }
      case ' ': {
        this.setState({ img: s2empty })
        break
      }
      default: {
        this.setState({ img: s2c, nextState: 's_1morecoin' })
        break
      }
    }
  }

  s_station3(nextChar) {
    switch(nextChar) {
      case '1': {
        this.setState({ img: s31, nextState: 's_station1' })
        break
      }
      case '2': {
        this.setState({ img: s32, nextState: 's_station2' })
        break
      }
      case '3': {
        this.setState({ img: s33 })
        break
      }
      case ' ': {
        this.setState({ img: s3empty })
        break
      }
      default: {
        this.setState({ img: s3c, nextState: 's_2morecoins' })
        break
      }
    }
  }

  s_done(nextChar) {
    switch(nextChar) {
      case '1': {
        this.setState({ img: done1, nextState: 's_station1' })
        break
      }
      case '2': {
        this.setState({ img: done2, nextState: 's_station2' })
        break
      }
      case '3': {
        this.setState({ img: done3, nextState: 's_station3' })
        break
      }
      case ' ': {
        this.setState({ img: doneempty })
        break
      }
      default: {
        this.setState({ img: donec, nextState: 's_trap' })
        break
      }
    }
  }

  s_2morecoins(nextChar) {
    switch(nextChar) {
      case 'C': {
        this.setState({ img: more2coinsc, nextState: 's_1morecoin' })
        break
      }
      case ' ': {
        this.setState({ img: more2coinsempty })
        break
      }
      default: {
        this.setState({ img: more2coins123, nextState: 's_trap' })
        break
      }
    }
  }

  s_1morecoin(nextChar){
    switch(nextChar) {
      case 'C': {
        this.setState({ img: more1coinc, nextState: 's_done' })
        break
      }
      case ' ': {
        this.setState({ img: more1coinempty })
        break
      }
      default: {
        this.setState({ img: more1coin123, nextState: 's_trap' })
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
            onChange={ (e)=>this.setState({text: e.target.value}) }/>

          <button className="enterbutton"
            onClick={ ()=>this.handleEnterClick() }>Enter
          </button>

          <button className="clearbutton"
            onClick={ ()=>this.handleClearClick() }>Clear
          </button>
          <div className="help">
            <button disabled>1 : Select Station 1</button>
            <button disabled>2 : Select Station 2</button>
            <button disabled>3 : Select Station 3</button>
            <button disabled>C : Insert 1 Coin</button>
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
          <br/>Last Update: 16-Feb-2020 10:40PM
        </div>

      </div>
    );
  }
}

export default App;


//npm start
//npm run deploy