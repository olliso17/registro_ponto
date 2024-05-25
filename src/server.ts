import { AppError } from "./error/app.error";

const regex = /\d{2}:\d{2}:\d{2}/
const hours_worked= "a0:00:00"

if(regex.test(hours_worked)===false){
   console.log(regex.test(hours_worked))
}
console.log(regex.test(hours_worked))
