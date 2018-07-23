const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    rp = require('request-promise'),
    rp_errors = require('request-promise/errors');

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('I am running...');
})

app.post('/endpoint', (req, res) => {
    console.log(req.body);

    if(req.body &&
         req.body.originalDetectIntentRequest && 
         req.body.originalDetectIntentRequest.payload &&
         req.body.originalDetectIntentRequest.payload.user) {
             console.log(req.body.originalDetectIntentRequest.payload.user)
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
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
