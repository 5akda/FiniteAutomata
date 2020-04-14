// import รูปเข้ามาตรงนี้
import img from "../images/Init.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateInit(input) {
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
    case "4": {
      return [img, 'Station4'];
    }
    case "R":
    case " ": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Fault'];
    }
  }
}