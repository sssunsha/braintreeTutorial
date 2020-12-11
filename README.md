# braintreeTutorial

How to use:
1. npm install
2. npm start
3. visit localhost:3000 on your browser
4. input crade number, etc. and click `pay`
5. F12 to check the network and if succes, in the browser console will print the transaction id, then you can check it in the Braintree cli
https://sandbox.braintreegateway.com/login


if you wish to catch the requests

add below codes into ./node_modules/braintree/lib/braintree/environment.js


    this.Pipedream = new Environment('3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443', 'https://auth.venmo.com', true, '3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443');


and update checkout.js like so


    var gateway = braintree.connect({
      environment: braintree.Environment.Pipedream,


# others
1. authorization service code is at: /routes/checkout.js
2. client code is at: /views/form.hbs
