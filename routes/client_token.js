var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.get('/', function (req, res, next) {
    var gateway = braintree.connect({
        // environment: braintree.Environment.Pipedream,
        environment: braintree.Environment.Sandbox,
        // Use your own credentials from the sandbox Control Panel here
        merchantId: 'mpmfynzxz947hjzd',
        publicKey: '82rbzt4536v6qhn9',
        privateKey: 'a6f05129b03937b4c6924ff2010bcf37'
    });
    gateway.clientToken.generate({}, (err, response) => {
        res.send(response);
    });
});

module.exports = router;