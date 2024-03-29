// import รูปเข้ามาตรงนี้
import img from "../images/Station1.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateStation1(input) {
  switch(input) {
    case "2": {
      return [img, 'Station2'];
    }
    case "3": {
      return [img, 'Station3'];
    }
    case "4": {
      return [img, 'Station4'];
    }
    case "C": {
      return [img, 'Done'];
    }
    case "R": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Station1'];
    }
  }
}