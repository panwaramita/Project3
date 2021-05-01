
const db = require("../models");

exports.createMemories = (req, res) => {
    db.Memories.create({
        description: req.body.description,
        title: req.body.title,
        imageurl: req.body.imageurl,
        UserId:req.body.UserId
    })
        .then((data) => res.send(data))
        .catch((err) => { console.log(err) })
}

exports.getMemories = (req, res) => {
    console.log("the id is ", req.query);
    db.Memories.findAll({ where: { userId: req.query.id } })
        .then((data) => { res.json(data) })
        .catch((err) => { console.log(err) })
}

exports.updateMemories=(req, res)=> {
    db.Memories.findAll({ where: { id: req.body.id } })
        .then(function (data) {
            const memoID = (data[0].dataValues.id);
            db.Memories.update(req.body,
                {
                    where: {
                        id: memoID
                    }
                })
                .then(function (dbmemo) {
                    res.json(dbmemo);
                });
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}

exports.filterDate=(req, res)=> {
    console.log(req.query.date);
    db.Memories.findAll({ where:{ UserId: req.query.userId} })
        .then(function (data) {
            console.log(data);
            const returnArray=[];
            data.forEach(element => {
                if(element.dataValues.createdAt==req.query.date)
                {
                    returnArray.push(element);
                }
            });
            
            console.log(returnArray)
            res.json(returnArray);
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}

exports.deleteMemories = (req, res) => {
    db.Memories.destroy({ where: { id: req.query.id } })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.status(401).json(err);
        })
}