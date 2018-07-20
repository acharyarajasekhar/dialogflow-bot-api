const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('I am running...');
})

app.post('/userById', (req, res) => {
    console.log(req.body);
    res.send("I got it");
})

const server = app.listen(8091, function () {
   var host = server.address().address;
   var port = server.address().port;   
   console.log("App listening at http://%s:%s", host, port);
})