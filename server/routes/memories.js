const controller=require("../controllers/memories");
const express =require('express');

const Router=express.Router();
Router.post("/create",controller.createMemories);
Router.get("/read",controller.getMemories);  
Router.post("/update",controller.updateMemories);
Router.get("/filter",controller.filterDate);
Router.delete("/delete",controller.deleteMemories);
module.exports=Router;