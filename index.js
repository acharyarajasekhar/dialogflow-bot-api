const
    express = require('express'),
    { urlencoded, json } = require('body-parser'),
    cors = require('cors'),
    rp = require('request-promise'),
    rp_errors = require('request-promise/errors'),
    jwt = require('jsonwebtoken'),
    auth = require('./auth'),
    api = require('./api');

const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('I am running...');
})

app.post('/endpoint', auth, api);

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
