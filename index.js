import express from "express";
import bodyParser from "body-parser";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const xlsx = require("xlsx");
const workbook = xlsx.readFile("Book2.xlsx");
const worksheet = workbook.Sheets["Sheet1"];
const arrStudents = xlsx.utils.sheet_to_json(worksheet);

const data = {};
for (var stu of arrStudents) {
  data[stu["ROLLNO"]] = {
    Name: stu["NAME"],
    Outstanding: stu["JAN(CR, Outstanting)"],
    FebMessBill: stu["FEB MESS BILL"],
    Total: stu["Total"],
  };
}
console.log(data);

app.get("/", (req, res) => {
  //   const a = JSON.stringify(arrStudents);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.json(data);
});
app.listen(PORT, () => {
  console.log(`server running on port: http://localhost:${PORT}`);
});
