const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('I am running...');
})

app.post('/userById', (req, res) => {
    console.log(req);
    res.send("I got it");
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
