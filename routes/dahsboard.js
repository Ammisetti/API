const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

const Lists = require('../public/javascripts/schema');

router.route('/')
.get((req, res, next)=> {
    Lists.find()
    .then((todos)=> {
        res.statusCode = 200;
        res.type('application/json');
        res.json(todos);
    }, (err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = router;