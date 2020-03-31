// import รูปเข้ามาตรงนี้
import img from "../images/2morecoins.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function state2MoreCoins(input) {
  switch(input) {
    case "C": {
      return [img, '1MoreCoin'];
    }
    case "R": {
      return [img, 'Init'];
    }
    case " ": {
      return [img, '2MoreCoins']
    }
    default: {
      return [img, 'Fault'];
    }
  }
}