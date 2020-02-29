// Import Images of this State
import Init_1 from '../images/init-1.png'
import Init_2 from '../images/init-2.png'
import Init_3 from '../images/init-3.png'
import Init_c from '../images/init-c.png'
import Init_empty from '../images/init-empty.png'

// Function Returns Image File & Name of Next State
export function stateInit(nextChar) {
  switch(nextChar) {
    case '1': {
      return [Init_1, 'Station1'] 
    }
    case '2': {
      return [Init_2, 'Station2']
    }
    case '3': {
      return [Init_3, 'Station3'] //Wrong
    }
    case '4': {
      return [Init_3, 'Station4']
    }
    case ' ': {
      return [Init_empty, 'Init']
    }
    default: {
      return [Init_c, 'Trap']
    }
  }
}