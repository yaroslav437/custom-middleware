import express from "express";
import {dirname} from  "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import bodyParser from "body-parser";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var bandName = "";
 app.use(bodyParser.urlencoded({ extended: true}));

 function bandNameGenerator(req,res,next){
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
 }

app.use(morgan("tiny"));
app.use(bandNameGenerator);
app.get("/",(req,res)=>{
  res.sendFile(_dirname + "/public/index.html");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post("/submit",(req,res)=>
{
  res.send(`<h1> your bandName is : </h1><h2>${bandName}</h2>`);
}
);

