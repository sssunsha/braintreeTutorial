var express = require('express');
var router = express.Router();

// handle to start brain tree hosted fields e2e test
router.get('/', function(req, res, next) {
    res.render('e2e_test', { title: 'Brain tree e2e test hosted fields' });
});

module.exports = router;