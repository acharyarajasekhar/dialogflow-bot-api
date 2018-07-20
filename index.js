import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import request from 'request';
    
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
        request
            .get('https://reqres.in/api/users/' + req.body.queryResult.parameters.user)
            .on('response', function(response) {
                console.log(response);
                return res.json({
                    fulfillmentText: JSON.stringify(response.body)
                });
            })
            .on('error', function(err) {
                console.log(err);
                return res.json({
                    fulfillmentText: "I am not able contact user's API"
                });
            })
    }
    else {
        return res.json({
            fulfillmentText: "Seems you have provided invalid user id '" + req.body.queryResult.parameters.user + "'. Please try again."
        });
    }

    
    
})

const server = app.listen(process.env.PORT, () => {
    console.log("App listening at http://%s:%s", server.address().address, server.address().port);
}); // taskkill /f /im node.exe
