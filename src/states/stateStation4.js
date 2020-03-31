// import รูปเข้ามาตรงนี้
import img from "../images/Station4.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateStation4(input) {
  switch(input) {
    case "1": {
      return [img, 'Station1'];
    }
    case "2": {
      return [img, 'Station2'];
    }
    case "3": {
      return [img, 'Station3'];
    }
    case "C": {
      return [img, '3MoreCoins'];
    }
    case "R": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Station4'];
    }
  }
}