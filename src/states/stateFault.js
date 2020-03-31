// import รูปเข้ามาตรงนี้
import img from "../images/Fault.png";

// เขียน Function ที่ returns รูป กับ ชื่อ state ถัดไป
export function stateFault(input) {
  switch(input) {
    case "R": {
      return [img, 'Init'];
    }
    default: {
      return [img, 'Fault'];
    }
  }
}