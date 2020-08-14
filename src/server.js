const express = require('express');
require('dotenv').config();
const Monk = require('monk');
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const db = Monk(process.env.MONGO_CONN);
const boards = db.get('boards');
const users = db.get('users');

// Schemas
const BoardSchema = require('./server/BoardSchema');
const ListSchema = require('./server/ListSchema');
// Cors
const whitelist = ['http://localhost:5000', 'http://localhost:3000', 'http://bruty.net', 'http://51.195.151.113:5000'];

const corsOptions = {
    origin: (origin, callback)  => {
        return callback(null,true);
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

////////////////////////////////////////////////////////////////    
// CRUD Boards
///////////////////////////////////////////////////////////////    

// Get a board by id
app.get('/board/:id', (req, res) => {
    let id = req.params.id;
    // ToDo: validate userID if board is private
    boards.findOne({_id: id}).then((doc) => {
        if(!doc){
            return res.sendStatus(404);
        }
        else{
            return res.send(doc);
        }

    }).catch((err) => {
        res.status(404)
        res.send(err)
    });
});

app.get('/board/:id/max', async (req, res) => {
    let id = req.params.id;
    await boards.findOne({_id: id}, "maxCardId")
    .then((response) => 
    res
        .send(response.maxCardId.toString()))
        .sendStatus(200)
    .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    });
})

// Create a new board
app.post('/board', async (req, res) => {
    let board = req.body;
    let userID = board.userID;
    delete board["userID"];
    try{
        // Ensure that it's valid
        await BoardSchema.validate(board)
        // Put it in to the database
        const response = await boards.insert(board)
        // Update the user's boards to contain the new board
        await users.update({"_id": userID}, {$push:{"boards": response._id}})
        res.status(200);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

// Update an element of a board
// ToDo possibly stream-line by  only updating what's been changed
app.put('/board/:boardID', async (req, res) => {
    const boardID = req.body.boardID
    delete req.body['boardID'];
    try{
        await ListSchema.validate(req.body);
        // Update the list in database
        await boards.findOneAndUpdate(
            {_id: boardID},
            {
                $set: {lists: req.body.lists},
                $inc: { maxCardId: 1 }
            })
        .then(() => res.status(200))
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }

})

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