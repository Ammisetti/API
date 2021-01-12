const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Lists = require('../public/javascripts/schema');

router.use(bodyParser.json());

router.route('/')
.post((req, res, next)=> {
    Lists.create(req.body)
    .then((todo)=>{
        //console.log(`toDo created: ${todo}`);
        res.statusCode = 200;
        res.type('application/json');
        res.json(todo);
    }, (err)=> next)
    .catch((err)=> next(err));
});

module.exports = router;