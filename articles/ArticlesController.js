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

//Editar Artigos

router.get("/admin/articles/edit/:id",(req,res)=>{

    var id =req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){

            Category.findAll().then(categories =>{
                res.render("admin/articles/edit.ejs",{article: article, categories:categories});

            })
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });


});

//salvar as alterações
router.post("/articles/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title:title, body:body, categoryId: category, slug:slugify(title)},
        {where:{
            id:id
        }}).then(()=>{
            res.redirect("/admin/articles"); 
        })
});


//controle da paginação
router.get("/articles/page/:num",(req,res)=>{
    var page = req.params.num;
    var offset = 0;

    if(isNaN(page) || page == 1){
        offset =0;
    }else{
        offset = parseInt(page)*4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles =>{



        var next;
        if(offset +4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result ={
            next: next,
            articles: articles 
        }

        Category.findAll().then(categories =>{
            res.render("admin/articles/page.ejs",{result: result, categories: categories})
        })

        res.json(result);
    })

});

module.exports = router;