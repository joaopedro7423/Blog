const express = require("express");
const router = express.Router();


router.get("/articles",(req,res)=>{
    res.send("ROTA DE ARTIGOS");
});

router.get("/admin/aticles/new",(req,res)=>{
    res.send("ROTA PARA UM NOVO ARTIGO");
});

module.exports = router;