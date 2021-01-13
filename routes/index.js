const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(bodyParser.json());

router.route('/')
.get((req, res, next)=> {
    res.send('You need to signUp or Login!');
});

module.exports = router;