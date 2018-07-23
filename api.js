const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    rp = require('request-promise'),
    rp_errors = require('request-promise/errors'),
    jwt = require('jsonwebtoken');

module.exports = (req, res) => {

    if (req.body.queryResult.intent.name === "projects/genomicsecombot/agent/intents/85c35b12-ee2d-4c6c-892d-4f73d5d9faf1")
    {
        return res.json({
            fulfillmentText: "Here is your profile",
            fulfillmentMessages: [
                {
                  "card": {
                    "Name": req.userInContext.name,
                    "Email": req.userInContext.email,
                    "imageUri": req.userInContext.picture
                  }
                }
            ]
        });
    }


    if (isNaN(req.body.queryResult.parameters.userid)) {
        return res.json({
            fulfillmentText: "Seems you have provided invalid user id '" + req.body.queryResult.parameters.userid + "'. Please try again."
        });
    }
    else {
        var options = {
            method: 'GET',
            uri: 'https://reqres.in/api/users/' + req.body.queryResult.parameters.userid,
            json: true
        };

        rp(options)
            .then(response => {
                console.log(response);
                if(response && response.data) {
                    return res.json({
                        fulfillmentText: "The requested user name is " + response.data.first_name + " " + response.data.last_name
                    });
                }
                else {
                    return res.json({
                        fulfillmentText: "Could't locate the requested user details from our database..."
                    });
                }
            })
            .catch(rp_errors.StatusCodeError, reason => {
                console.log(reason.statusCode);
                if(reason.statusCode === 404) {
                    return res.json({
                        fulfillmentText: "Could't locate the requested user details from our database..."
                    });
                }
                else {
                    return res.json({
                        fulfillmentText: "Something went wrong while contacting the backed servers. Please contact the support team..."
                    });
                }
            })
            .catch(rp_errors.RequestError, function (reason) {
                console.log(reason.cause);
                return res.json({
                    fulfillmentText: "Something went wrong while contacting the backed servers. Please contact the support team..."
                });
            });
    }
}