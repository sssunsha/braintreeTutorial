window.onload = function () {
    var form = $('#e2e-form');
    var orderId = document.querySelector('#e2e-orderId');
    var customerSessionId = document.querySelector('#e2e-customerSessionId');
    var jwtToken = document.querySelector('#jwt-token');
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
                    'Authorization': jwtToken.value,
                    'Content-Language': 'en-us'
                },
                data: JSON.stringify(requestBody)
            }).done(function (result) {
                if (result && result.pattern == 'HOSTED_FIELDS') {
                    // start to render the hosted fileds with the response result
                    var htmlSrcUrl = window.URL.createObjectURL(new Blob([result.dynamicScript.html], {type: 'text/html;charset=utf-8'}))
                    console.log(htmlSrcUrl);
                    iframe.src = htmlSrcUrl;
                    // set local storage
                    localStorage.setItem("Authorization", jwtToken.value);
                    localStorage.setItem("Customer-session-id", customerSessionId.value);
                }
            });
        }
    });
}