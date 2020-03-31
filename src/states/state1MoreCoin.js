// import รูปเข้ามาตรงนี้
import img from "../images/1morecoin.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function state1MoreCoin(input) {
  switch(input) {
    case "C": {
      return [img, 'Done'];
    }
    case "R": {
      return [img, 'Init'];
    }
    case " ": {
      return [img, '1MoreCoin']
    }
    default: {
      return [img, 'Fault'];
    }
  }
}