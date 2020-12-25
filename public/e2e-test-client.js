window.onload = function () {
    var form = $('#e2e-form');
    var orderId = document.querySelector('#e2e-orderId');
    var customerSessionId = document.querySelector('#e2e-customerSessionId');
    var iframe = document.querySelector('#iframe');

    form.submit(function (event) {
        event.preventDefault();
        if (orderId.value) {
            // start to post the initiate request
            var requestBody = {
                'orderId': orderId.value,
                'emailAddress': 'upscale@sap.com',
                'resultURL': 'https://example.com/success',
                'cancelURL': 'https://example.com/cancel',
                'channel': 'BROWSER',
                'billingAddress': {
                    'firstName': 'brainTree',
                    'lastName': 'localE2ETest',
                    'addressLine1': '123 Main Street',
                    'addressLine2': '123 Main Street',
                    'addressLine3': '123 Main Street',
                    'city': 'Small Town',
                    'state': 'CA',
                    'country': 'US',
                    'postalCode': 98765
                },
                'browserInfo': {
                    'acceptHeader': 'text/html',
                    'colorDepth': 48,
                    'javaEnabled': false,
                    'javaScriptEnabled': false,
                    'language': 'de',
                    'screenHeight': 1200,
                    'screenWidth': 1600,
                    'userAgent': 'Mozilla/4.0',
                    'timezoneOffset': 60,
                    'ipAddress': '192.168.0.1',
                    'originUrl': 'https://example.com'
                }
            }


            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                url: 'https://gateway-approuter-caas2-sap-test.cfapps.us10.hana.ondemand.com/consumer/payment-service/gateway/initiate',
                headers: {
                    'Customer-session-id': customerSessionId.value,
                    'Content-Language': 'en-us'
                },
                data: JSON.stringify(requestBody)
            }).done(function (result) {
                if (result && result.pattern == 'HOSTED_FIELDS') {
                    // start to render the hosted fileds with the response result

                    // first add scripts
                    // if (result.dynamicScript.jsUrls && result.dynamicScript.jsUrls.length > 0) {
                        
                    // } else {
                    //    result.dynamicScript.jsUrls = [
                    //        {url: 'https://js.braintreegateway.com/web/3.69.0/js/client.min.js'},
                    //        {url: 'https://js.braintreegateway.com/web/3.69.0/js/data-collector.min.js'},
                    //        {url: 'https://js.braintreegateway.com/web/3.69.0/js/hosted-fields.min.js'},
                    //        {url: 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js'}
                    //    ]
                    // }

                    // result.dynamicScript.jsUrls.forEach(js => {
                    //     var script = document.createElement("script");
                    //     script.type = "text/javascript";
                    //     script.src = js.url;
                    //     document.body.appendChild(script);
                    // });

                    // then render html
                    // var ifrdoc = iframe.contentWindow.document;
                    // ifrdoc.open();
                    // ifrdoc.write(result.dynamicScript.html);
                    // ifrdoc.close();

                    var htmlSrcUrl = window.URL.createObjectURL(new Blob([result.dynamicScript.html], {type: 'text/html;charset=utf-8'}))
                    console.log(htmlSrcUrl);
                    iframe.src = htmlSrcUrl;
                }
            });
        }
    });
}