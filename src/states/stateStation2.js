// import รูปเข้ามาตรงนี้
import img from "../images/Station2.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateStation2(input) {
  switch(input) {
    case "1": {
      return [img, 'Station1'];
    }
    case "3": {
      return [img, 'Station3'];
    }
    case "4": {
      return [img, 'Station4'];
    }
    case "C": {
      return [img, '1MoreCoin'];
    }
    case "R": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Station2'];
    }
  }
}