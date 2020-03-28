// Import Images of this State
import img from '../images/init.png'

// Function Returns Image File & Name of Next State
export function stateInit(nextChar) {
  switch(nextChar) {
    case '1': {
      return [img, 'Station1'] 
    }
    case '2': {
      return [img, 'Station2']
    }
    case '3': {
      return [img, 'Station3'] //Wrong
    }
    case '4': {
      return [img, 'Station4']
    }
    case ' ': {
      return [img, 'Init']
    }
    default: {
      return [img, 'Trap']
    }
  }
}