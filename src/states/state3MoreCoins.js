// import รูปเข้ามาตรงนี้
import img from "../images/3morecoins.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function state3MoreCoins(input) {
  switch(input) {
    case "C": {
      return [img, '2MoreCoins'];
    }
    case "R": {
      return [img, 'Init'];
    }
    case " ": {
      return [img, '3MoreCoins']
    }
    default: {
      return [img, 'Fault'];
    }
  }
}