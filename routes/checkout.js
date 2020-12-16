var express = require('express');
var router = express.Router();
var braintree = require('braintree');


router.post('/', function(req, res, next) {

  var gateway = braintree.connect({
    // environment: braintree.Environment.Pipedream,
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'mpmfynzxz947hjzd',
    publicKey: '82rbzt4536v6qhn9',
    privateKey: 'a6f05129b03937b4c6924ff2010bcf37'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.customFields[0].value;
  var amountFromTheClient = req.body.amount;
  var deviceDataFromTheClient = req.body.customFields[1].value;
  var orderIdFromClient = req.body.orderId;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce: nonceFromTheClient,
    deviceData: deviceDataFromTheClient,
    orderId: orderIdFromClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: false
    }
  }, function(error, result) {
    console.log(JSON.stringify(result));
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
