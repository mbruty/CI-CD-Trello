const express = require('express');
require('dotenv').config();
const Monk = require('monk');
const yup = require('yup');
var bodyParser = require('body-parser');
const app = express();
const db = Monk(process.env.MONGO_CONN);
const boards = db.get('boards');
const users = db.get('users');

app.use(bodyParser.json());

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