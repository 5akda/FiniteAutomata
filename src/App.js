import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Form, Navbar, Nav } from 'react-bootstrap';

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

        <Navbar variant="dark">
          <Navbar.Brand>Ticket Vendor</Navbar.Brand>
          <Nav className="mr-auto">
            
          </Nav>
          <Form inline className="Header">
            <Button variant="outline-info">Help</Button>
            <Button variant="outline-info">About Us</Button>
          </Form>
        </Navbar>

        <div className="Layout-input">

          <InputGroup className="Input-group">
              <FormControl
                placeholder="Enter a String"
                value={this.state.text}
                onChange={ (e)=>this.setState({text: e.target.value}) }
              />
              <InputGroup.Append>
                <Button variant="success" onClick={()=>this.handleEnterClick()}>
                  &nbsp;ENTER&nbsp;
                </Button>
                <Button variant="danger" onClick={()=>this.handleClearClick()}>
                  &nbsp;CLEAR&nbsp;
                </Button>
              </InputGroup.Append>
          </InputGroup>

          <div className="help">
            <Button variant="outline-primary" onClick={()=>this.handleCharClick('1')}>
              1 : Select Station 1
            </Button>
            <Button variant="outline-primary" onClick={ ()=>this.handleCharClick('2') }>
              2 : Select Station 2
            </Button>
            <Button variant="outline-primary" onClick={ ()=>this.handleCharClick('3') }>
              3 : Select Station 3
            </Button>
            <Button variant="outline-primary" onClick={ ()=>this.handleCharClick('4') }>
              4 : Select Station 4
            </Button>
            <Button variant="outline-primary" onClick={ ()=>this.handleCharClick('C') }>
              C : Insert 1 Coin
            </Button>
          </div>
          
        </div>

        <div className="Layout-controller">
          <div className="Layout-buttonzone">
            <Button variant="outline-warning"
              onClick={ ()=>this.handleNextClick() } 
              disabled={this.state.unclickable}>{this.state.nextbutton}
            </Button>
            
            <Button variant="outline-warning"
              onClick={ ()=>this.handleAutoplayClick() }
              disabled={this.state.unclickable}>Autoplay
            </Button>
          </div>

          <b className="string">-&gt;{this.state.string}</b>

        </div>

        <div className="Layout-body">
          <img src={ this.state.img } alt="img"/>
          <br/>Last Update: 9-Mar-2020 3:30PM
        </div>

      </div>
    );
  }
}

export default App;


//npm start
//npm run deploy