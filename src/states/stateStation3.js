// import รูปเข้ามาตรงนี้
import img from "../images/Station3.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateStation3(input) {
  switch(input) {
    case "1": {
      return [img, 'Station1'];
    }
    case "2": {
      return [img, 'Station2'];
    }
    case "4": {
      return [img, 'Station4'];
    }
    case "C": {
      return [img, '2MoreCoins'];
    }
    case "R": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Station3'];
    }
  }
}