const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const Lists = require('../public/javascripts/schema');

router.use(bodyParser.json());

router.route('/:listId')
.put((req, res, next)=> {
    Lists.findByIdAndUpdate(req.params.listId, {
        $set: req.body
    }, {new: true})
    .then((todos)=> {
        res.statusCode = 200;
        res.type('application/json');
        res.json(todos);
    }, (err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = router;