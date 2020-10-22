const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

//Página central dos artigos
router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        //inner join com categories
        include:[{model: Category}]
}).then(articles =>{
        // iner joins com sequelize

        res.render("admin/articles/index.ejs",{articles: articles});

    })
    
});

//novo artigo
router.get("/admin/articles/new",(req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new.ejs",{categories:categories});
  
    })

});

//salvar o novo artigo
router.post("/articles/save",(req,res)=>{
  var title = req.body.title;
  var body = req.body.body;
  var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category

    }).then(()=>{
        res.redirect("/admin/articles");
    })



});


//Deletar Artigos
router.post("/articles/delete",(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){

            Article.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            });

        }else{ // Não for numero
            res.redirect("/admin/articles");
        }
    }else{ // null
        res.redirect("/admin/articles");
    }
});

//

module.exports = router;