import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Form, Navbar, Nav, Modal } from 'react-bootstrap';

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
      looper: null,
      showHelp: false,
      showAboutUS: false
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
      
      // ----- STATE SELECTOR ----- //
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
    // - Iterate - //
    this.setState({looper: setInterval(() => this.handleNextClick(),1800)})
  }

  handleCharClick(char) {
    // - Insert a char by clicking a button - //
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

            <Button
              onClick={()=>this.setState({showHelp:true})}
              variant="outline-info">Help
            </Button>

            <HelpModal
              show={this.state.showHelp}
              onHide={ ()=> this.setState({showHelp: false}) }
            />

            <Button 
              onClick={()=>this.setState({showAboutUS:true})}
              variant="outline-info">About Us
            </Button>

            <AboutUsModal
              show={this.state.showAboutUS}
              onHide={()=>this.setState({showAboutUS:false})}
            />
          </Form>
        </Navbar>

        <div className="Layout-input">

          <InputGroup className="Input-group">
            <InputGroup.Prepend>
              <InputGroup.Text>String</InputGroup.Text>
            </InputGroup.Prepend>
                <FormControl
                  placeholder="Ex.3CCC12CC"
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
          <br/>Last Update: 12-Mar-2020 4:30PM
        </div>
      </div>
    );
  }
}

export default App;

function HelpModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Help
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          DFA แบบจำลองเครื่องขายตั๋ว
          <ul>
            <li>
              เลือกสถานีและสามารถเปลี่ยนไปสถานีอื่นได้ถ้ายังไม่ใส่เหรียญ
            </li>
            <li>
              เมื่อใส่เหรียญแล้วต้องใส่ให้ครบตามจำนวนสถานีที่ผ่าน
            </li>
          </ul>
        </p>
        <p>
          <b>วิธีใช้งาน</b>
          <ol>
            <li>
              พิมพ์ String ที่มี Symbol ใน &Sigma;{" = {1, 2, 3, 4, C} "} หรือกดปุ่มเพื่อเพิ่ม Symbol
            </li>
            <li>
              กด Enter เพื่อนำ Input ไปใส่ใน DFA
            </li>
            <li>
              กด Start แล้วกด Next เพื่อดู Transition ทีละ Step หรือกด Autoplay เพื่อดู Transition ต่อไปโดยอัตโนมัติ
            </li>
          </ol>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AboutUsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About Us
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          จัดทำโดยนักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์
          สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          (CE KMITL #56)
          <ul>
            <li>
              นายxxxxx xxxxxxxxxx 60010xxx
            </li>
            <li>
              นายxxxxx xxxxxxxxxx 60010xxx
            </li>
            <li>
              นายxxxxx xxxxxxxxxx 60010xxx
            </li>
            <li>
              นายxxxxx xxxxxxxxxx 60010xxx
            </li>
            <li>
              นายxxxxx xxxxxxxxxx 60010xxx
            </li>
          </ul>
          Source Code:&nbsp;
          <a href="https://github.com/parzival48/FiniteAutomata">
            Github Repository
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


//npm start
//npm run deploy