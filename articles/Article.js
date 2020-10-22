const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

//criação da tabela no banco, etc
const Article = connection.define('articles',{
   title:{
       type: Sequelize.STRING,
       allowNull: false
   },
   slug:{
       type: Sequelize.STRING,
       allowNull: false
   },
   body:{
       type: Sequelize.TEXT,
       allowNull: false
   }

});
Category.hasMany(Article);//Uma categoria tem muitos artigos
Article.belongsTo(Category);//um artigo pertence a uma categoria

Article.sync({force: false});

module.exports = Article;