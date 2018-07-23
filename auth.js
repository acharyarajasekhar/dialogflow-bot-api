const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    rp = require('request-promise'),
    rp_errors = require('request-promise/errors'),
    jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    console.log(req.body);

    if(req.body &&
         req.body.originalDetectIntentRequest && 
         req.body.originalDetectIntentRequest.payload &&
         req.body.originalDetectIntentRequest.payload.user) {
            console.log(req.body.originalDetectIntentRequest.payload.user);
            var decoded = jwt.decode(req.body.originalDetectIntentRequest.payload.user.idToken);
            console.log(decoded);

            var isAuth = 
                (
                    decoded.iss === "https://accounts.google.com" &&
                    decoded.aud == process.env.CLIENT_ID
                );

            if(isAuth){
                req.userInContext = decoded;
                next();
            }
            else {
                return res.json({
                    fulfillmentText: "Sorry! your authentication failed from Eurofins Genomics API. Please contact the application support team..."
                });
            }
                    
         }

}