const express =require("express");
const app = express();
const bodyParser = require('body-parser');
// Conecção com o banco: 
// const connection = require("./database/database.js");


//View engine serve para funcionar o ejs
app.set('View engine','ejs');

//static
app.use(express.static('public'));


//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
/*
connection
  .authenticate()
  .then(()=>{
      console.log("Conexão com o banco feita");
  }).catch((error)=>{
      console.log(error ao conectar ao BD);
  })

*/

app.get("/",(req,res)=>{
  //  res.send("bem vindo ao gulag");
    res.render("index.ejs");

});




app.listen(1010,()=>{
    console.log("O server rodou");
});
