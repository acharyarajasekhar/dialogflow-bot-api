const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
    
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('I am running...');
})

app.post('/get-user-by-id', (req, res) => {
    console.log(req.body);
    return res.json({
        fulfillmentText: "I am coming from API",
        source: 'get-user-by-id'
    });
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
