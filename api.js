const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    rp = require('request-promise'),
    rp_errors = require('request-promise/errors'),
    jwt = require('jsonwebtoken'),
    rn = require('random-number');

const order_status = ["PLACED", "IN PROGRESS", "PUBLISHED", "SHIPPED"];
var gen = rn.generator({
    min:  0
  , max:  3
  , integer: true
});

module.exports = (req, res) => {

    if (req.body.queryResult.intent.displayName == "query.my.user.profile") {
        var rrr = res.json({
            fulfillmentText: "Here is your profile. Name: " + req.userInContext.name + " Email: " + req.userInContext.email
        });

        return res.json(rrr);
    }
    else if (req.body.queryResult.intent.displayName == "get.order.status") {

        if (isNaN(req.body.queryResult.parameters.order_id)) {
            return res.json({
                fulfillmentText: "Seems you have provided invalid order id. Please try again."
            });
        }

        var rrr = res.json({
            fulfillmentText: "Your order is " + order_status[gen()]
        });

        return res.json(rrr);
    }
    else if(req.body.queryResult.intent.displayName == "get.order.delivery.date") {

        if (isNaN(req.body.queryResult.parameters.order_id)) {
            return res.json({
                fulfillmentText: "Seems you have provided invalid order id. Please try again."
            });
        }

        var newDate = new Date(date.setTime( date.getTime() + gen() * 86400000 ));

        var rrr = res.json({
            fulfillmentText: "Your order will be delivered on " + newDate.format("%Y-%m-%d %H:%M:%S")
        });

        return res.json(rrr);

    }
    else {
        var rrr = res.json({
            fulfillmentText: "Sorry, I am unable to understand your request. Please try in a different way"
        });

        return res.json(rrr);
    }


    // if (isNaN(req.body.queryResult.parameters.userid)) {
    //     return res.json({
    //         fulfillmentText: "Seems you have provided invalid user id '" + req.body.queryResult.parameters.userid + "'. Please try again."
    //     });
    // }
    // else {
    //     var options = {
    //         method: 'GET',
    //         uri: 'https://reqres.in/api/users/' + req.body.queryResult.parameters.userid,
    //         json: true
    //     };

    //     rp(options)
    //         .then(response => {
    //             console.log(response);
    //             if(response && response.data) {
    //                 return res.json({
    //                     fulfillmentText: "The requested user name is " + response.data.first_name + " " + response.data.last_name
    //                 });
    //             }
    //             else {
    //                 return res.json({
    //                     fulfillmentText: "Could't locate the requested user details from our database..."
    //                 });
    //             }
    //         })
    //         .catch(rp_errors.StatusCodeError, reason => {
    //             console.log(reason.statusCode);
    //             if(reason.statusCode === 404) {
    //                 return res.json({
    //                     fulfillmentText: "Could't locate the requested user details from our database..."
    //                 });
    //             }
    //             else {
    //                 return res.json({
    //                     fulfillmentText: "Something went wrong while contacting the backed servers. Please contact the support team..."
    //                 });
    //             }
    //         })
    //         .catch(rp_errors.RequestError, function (reason) {
    //             console.log(reason.cause);
    //             return res.json({
    //                 fulfillmentText: "Something went wrong while contacting the backed servers. Please contact the support team..."
    //             });
    //         });
    // }
}