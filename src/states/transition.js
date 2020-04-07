import { stateInit } from "./stateInit";
import { stateFault } from "./stateFault";
import { stateStation1 } from "./stateStation1";
import { stateStation2 } from "./stateStation2";
import { stateStation3 } from "./stateStation3";
import { stateStation4 } from "./stateStation4";
import { state1MoreCoin } from "./state1MoreCoin";
import { state2MoreCoins } from "./state2MoreCoins";
import { state3MoreCoins } from "./state3MoreCoins";
import { stateDone } from "./stateDone";

export function transitionFunction(state, symbol) {
  switch(state){
    case 'Init': {
      return stateInit(symbol);
    }
    case 'Fault': {
      return stateFault(symbol);
    }
    case 'Station1': {
      return stateStation1(symbol);
    }
    case 'Station2': {
      return stateStation2(symbol);
    }
    case 'Station3': {
      return stateStation3(symbol);
    }
    case 'Station4': {
      return stateStation4(symbol);
    }
    case '1MoreCoin': {
      return state1MoreCoin(symbol);
    }
    case '2MoreCoins': {
      return state2MoreCoins(symbol);
    }
    case '3MoreCoins': {
      return state3MoreCoins(symbol);
    }
    case 'Done': {
      return stateDone(symbol);
    }
    default: {
      return "halt";
    }
  }
}