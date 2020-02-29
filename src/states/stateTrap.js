// Import Images of this State
import Trap_123c from '../images/trap-123c.png'
import Trap_empty from '../images/trap-empty.png'

// Function Returns Image File & Name of Next State
export function stateTrap(nextChar) {
  switch(nextChar) {
    case '1': case '2': case '3': case '4': case 'C': {
      return [Trap_123c, 'Trap']
    }
    case ' ': {
      return [Trap_empty, 'Trap']
    }
    default: {
      return [Trap_123c, 'Trap']
    }
  }
}