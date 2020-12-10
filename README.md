# braintreeTutorial

if you wish to catch the requests

add below codes into ./node_modules/braintree/lib/braintree/environment.js


    this.Pipedream = new Environment('3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443', 'https://auth.venmo.com', true, '3af1da340a4aed83d7e75043a352b917.m.pipedream.net', '443');


and update checkout.js like so


    var gateway = braintree.connect({
      environment: braintree.Environment.Pipedream,
