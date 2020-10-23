//importando o essencial
const express =require("express");
const app = express();
const bodyParser = require('body-parser');
const session = require("express-session");
// Conecção com o banco: 
 const connection = require("./database/database.js");

//importanto os controladores 
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

//chamando os arquivos para criar as tabelas

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const Users = require("./users/User");



//View engine serve para funcionar o ejs
app.set('View engine','ejs');

//Sessions coloque alguma coisa aleatoria no secret
app.use(session({
  secret:"seupainasceupelado", cookie: {maxAge:30000000}
}));

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
app.use("/", usersController)

app.get("/session",(req,res)=>{
  req.session.treinamento = "Formação Node.js"
  req.session.ano = 2020
  req.session.email = "joaopedro7423@hotmail.com"
  req.session.user = {
      username: "João",
      email: "email@email.com",
      id: 10
  }
  res.send("Sessão gerada!!");

});

app.get("/leitura",(req,res)=>{

  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    email: req.session.email,
    user: req.session.user
  })
});

app.get("/",(req,res)=>{
  //  res.send("bem vindo ao gulag");
  Article.findAll({
    //mostrar do mais recente dos artigos
    order:[['id','DESC']]

  }).then(articles =>{

      Category.findAll().then(categories =>{

        res.render("index.ejs",{articles: articles, categories: categories});

      });

    
  });
    
});


// para ler os artigos controler e rota
app.get("/:slug",(req,res)=>{
  var slug = req.params.slug;
  Article.findOne({
    where:{
      slug: slug
    }
  }).then(article => {
    if(article != undefined){
      Category.findAll().then(categories =>{

        res.render("article.ejs",{article: article, categories: categories});

      });
    }else{
      res.redirect("/");
    }
  }).catch( err => {
    res.redirect("/");
  })

  });


//Filtrando artigos pela categoria 
app.get("/category/:slug",(req,res)=>{
  var slug = req.params.slug;
    Category.findOne({
      where:{
        slug: slug
      },
      include:[{model: Article}]
    }).then(category =>{
      if(category != undefined){

        Category.findAll().then(categories =>{
          res.render("index.ejs",{articles: category.articles, categories: categories })
        })

      }else{
        res.redirect("/");
      }
    }).catch( err => {
      res.redirect("/");
    })

});

//LOCAL HOST PARA O SERVIDOR
app.listen(1010,()=>{
    console.log("O server rodou");
});
