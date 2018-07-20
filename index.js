const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    request = require('request');

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('I am running...');
})

app.post('/get-user-by-id', (req, res) => {
    console.log(req.body);

    if (isNaN(req.body.queryResult.parameters.user)) {
        return res.json({
            fulfillmentText: "Seems you have provided invalid user id '" + req.body.queryResult.parameters.user + "'. Please try again."
        });
    }
    else {
        request
            .get('https://reqres.in/api/users/' + req.body.queryResult.parameters.user)
            .on('response', function (response) {
                console.log(response);
                return res.json({
                    fulfillmentText: JSON.stringify(response.body)
                });
            })
            .on('error', function (err) {
                console.log(err);
                return res.json({
                    fulfillmentText: "I am not able contact user's API"
                });
            });
    }
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
