import React, { Component } from "react";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Form, Navbar, Nav, Modal } from "react-bootstrap";

import { stateInit } from "./states/stateInit";
import { stateFault } from "./states/stateFault";
import { stateStation1 } from "./states/stateStation1";

import base from './images/Base.png';
import reader from './images/etc/readerArrow.png';
import helpImg from './images/etc/help1.jpg';

const credit = 'Source Code Last Update: 29-Mar-20 01:15AM';

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
      showHelp: true,
      showWarning: false,
      footMsg: credit
    }
    this.handleEnterClick = this.handleEnterClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleAutoplayClick = this.handleAutoplayClick.bind(this);
    this.handleCharClick = this.handleCharClick.bind(this);
    this.isFinishState = this.isFinishState.bind(this);
  }

  handleEnterClick() {
    if(this.state.text.match("[^1-4CRcr]")==null) {
      this.handleRestartClick();
      this.setState({ 
        string: ' '+this.state.text,
        unclickable: false,
        nextbutton: 'Start'
      });
    }
    else {
      this.setState({ showWarning: true });
    }
  }

  handleNextClick() {
    if(this.state.nextbutton === 'Restart'){
      this.handleRestartClick();
    }
    else{
      this.setState({ nextbutton: 'Next' });

      var presentChar = null;

      if(this.state.string.length > 1) {
        presentChar = this.state.string.charAt(1).toUpperCase();
      }
      else if(this.state.string.length === 1){
        presentChar = ' ';
      }
      else if(this.state.string.length === 0) {
        this.setState({ nextbutton: 'Restart' });
        return 0;
      }

      this.setState({ string: this.state.string.substring(1) });
      
      // ----- STATE SELECTOR ----- //
      let outputFromState = null;
      let q = this.state.nextState;
      switch(q){
        case 'Init': {
          outputFromState = stateInit(presentChar);
          break;
        }
        case 'Fault': {
          outputFromState = stateFault(presentChar);
          break;
        }
        case 'Station1': {
          outputFromState = stateStation1(presentChar);
          break;
        }
        default: {
          console.log('Something went wrong');
        }
      }
      
      this.isFinishState(q);

      this.setState({
        img: outputFromState[0],
        nextState: outputFromState[1]
      });
    }
  }

  handleRestartClick() {
    this.setState({
      string: ' '+this.state.text,
      nextState: 'Init',
      img: base,
      nextbutton: 'Start',
      footMsg: credit
    });
    clearInterval(this.state.looper);
  }

  handleClearClick() {
    this.setState({
      text: '',
      string: '',
      nextState: 'Init',
      img: base,
      unclickable: true,
      nextbutton: 'Start',
      footMsg: credit
    });
    clearInterval(this.state.looper);
  }

  handleAutoplayClick() {
    // - Iterate - //
    this.setState({looper: setInterval(() => this.handleNextClick(),1800)});
  }

  handleCharClick(char) {
    // - Insert a char by clicking a button - //
    this.setState({ text: this.state.text + char });
  }

  isFinishState(state) {
    if(state === "Done"){
      this.setState({ footMsg: "Accept this string!" });
      return true;
    }
    else{
      this.setState({ footMsg: credit });
      return false;
    }
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
              variant="warning">&nbsp;HELP &amp; ABOUT US&nbsp;
            </Button>

            <HelpModal
              show={this.state.showHelp}
              onHide={ ()=> this.setState({showHelp: false}) }
            />

          </Form>
        </Navbar>

        <div className="Layout-input">
          <InputGroup className="Input-group">
            <InputGroup.Prepend>
              <InputGroup.Text>String</InputGroup.Text>
            </InputGroup.Prepend>
                <FormControl
                  placeholder="e.g.2CC43C1R1C"
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

          <WarningModal
            show={this.state.showWarning}
            onHide={ ()=> this.setState({showWarning: false}) }
          />

          <div className="help">
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("1")}>
              1 : Select Station 1
            </Button>
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("2")}>
              2 : Select Station 2
            </Button>
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("3")}>
              3 : Select Station 3
            </Button>
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("4")}>
              4 : Select Station 4
            </Button>
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("C")}>
              C : Insert 1 Coin
            </Button>
            <Button variant="outline-primary" onClick={()=>this.handleCharClick("R")}>
              R : Reset
            </Button>
          </div>
          
        </div>

        <div className="Layout-controller">
          <div className="Layout-buttonzone">
            <Button variant="outline-warning"
              onClick={()=>this.handleNextClick()} 
              disabled={this.state.unclickable}>{this.state.nextbutton}
            </Button>
            
            <Button variant="outline-warning"
              onClick={()=>this.handleAutoplayClick()}
              disabled={this.state.unclickable}>Autoplay
            </Button>
          </div>

          <b className="string">
            <img src={ reader } height="45px" alt="arrow"/>{this.state.string}
          </b>

        </div>

        <div className="Layout-body">
          <img src={ this.state.img } alt="img"/>
          <br/>
          <a href="https://github.com/parzival48/FiniteAutomata">{ this.state.footMsg }</a>
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
      <Modal.Header>
        <h4><b>DFA เครื่องจำหน่ายตั๋วรถไฟ</b></h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          &emsp;เลือกสถานีและสามารถเปลี่ยนไปสถานีอื่นได้ถ้ายังไม่ใส่เหรียญ
          แต่เมื่อใส่เหรียญแล้วต้องใส่ให้ครบตามจำนวนสถานีที่ผ่าน
          (เช่นเลือกสถานี x , ก็ต้องจ่าย x เหรียญ)
          และถ้าหากทำขั้นตอนผิดพลาดให้กด Reset
        </p>
        <p>
          <b>วิธีใช้งานเว็บ</b>
          <ol>
            <li>
              พิมพ์ String ที่มี Symbol ใน &Sigma;{" = {1, 2, 3, 4, C, R} "} หรือกดปุ่มเพื่อเพิ่ม Symbol
            </li>
            <li>
              กด Enter เพื่อนำ Input ไปใส่ใน DFA
            </li>
            <li>
              กด Start แล้วกด Next เพื่อดู Transition ทีละ Step หรือกด Autoplay เพื่อดู Transition ต่อไปโดยอัตโนมัติ
            </li>
          </ol>
          <b>สมาชิกผู้จัดทำ</b>
          <ul>
            <li>60010727&emsp;นายพิสิษฐ์&ensp;มาหนู</li>
            <li>60010731&emsp;นายพีรดนย์&ensp;น้อมแนบ</li>
            <li>60010866&emsp;นายรัตนฤทธิ์&ensp;ประสมทรัพย์</li>
            <li>60010915&emsp;นายวสวัตติ์&ensp;บุณยฤทธิกิจ</li>
            <li>60010968&emsp;นายศักดา&ensp;สุวรรณธีรางกูร</li>
          </ul>
        </p>
        <div className="help-footer">
          <Button variant="info" onClick={props.onHide}>เข้าใจแล้ว !</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function WarningModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="help1"
    >
      <Modal.Body>
        <p>
          <span>&#9888;</span>
          &nbsp; โปรดป้อน String ที่เป็น Alphabet ในเซต &Sigma;{" = {1, 2, 3, 4, C, R} "}
          <br/>หรือเลือกกดปุ่มด้านล่าง
          <img src={ helpImg } alt="img" width="100%"/>
        </p>
        <div className="help-footer">
          <Button variant="info" onClick={props.onHide}>เข้าใจแล้ว !</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}


//ถ้าจะลองรันเว็บ ให้ลติดตั้ง Node.js
//จากนั้นใช้ cmd เข้าไปใน folder งาน
//แล้วพิมพ์คำสั่ง npm start


//อย่าไปยุ่งกับ Branch gh-pages ใน Git


//ใช้ตอน Deploy จริงเท่านั้น: npm run deploy
