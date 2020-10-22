//importando o essencial
const express =require("express");
const app = express();
const bodyParser = require('body-parser');
// Conecção com o banco: 
 const connection = require("./database/database.js");

//importanto os controladores 
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");


//chamando os arquivos para criar as tabelas

const Article = require("./articles/Article");
const Category = require("./categories/Category");



//View engine serve para funcionar o ejs
app.set('View engine','ejs');

//static 
app.use(express.static('public'));


//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database

connection
  .authenticate()
  .then(()=>{
      console.log("Conexão com o banco feita");
  }).catch((error)=>{
      console.log("error ao conectar ao BD");
  })



//ROTAS
app.use("/",categoriesController);
app.use("/",articlesController);



app.get("/",(req,res)=>{
  //  res.send("bem vindo ao gulag");
  Article.findAll().then(articles =>{
    res.render("index.ejs",{articles: articles});

  });
    
});


//LOCAL HOST PARA O SERVIDOR

app.listen(1010,()=>{
    console.log("O server rodou");
});
