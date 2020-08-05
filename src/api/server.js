const express = require('express');
require('dotenv').config();
const Monk = require('monk');
const yup = require('yup');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const db = Monk(process.env.MONGO_CONN);
const boards = db.get('boards');
const users = db.get('users');


const whitelist = ['http://localhost:5000', 'http://localhost:3000', 'http://bruty.net', 'http://51.195.151.113:5000'];

const corsOptions = {
    origin: (origin, callback)  => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null,true);
        }
        else{
            callback('Route not allowed');
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/board/:id', async (req, res) => {
    let id = req.params.id;
    try{
        const board = await boards.findOne({_id: id});
        if(!board){
            return res.status(404);
        }
        else{
            res.send(board);
        }
    } catch (err) {
        return res.status(404);
    }
});

app.get('/users/:id', async (req, res) => {
    let id = req.params.id;
    try{
        const user = await users.findOne({_id: id});
        if(!user){
            return res.status(404);
        }
        else{
            res.send(user);
        }
    } catch (err) {
        return res.status(404);
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);