const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const router = express.Router()

let User = require('./models/User')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/skeleton', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

router.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err)
        } else {
            res.json(users)
        }
    })
})

router.route('/:id').get(function(req, res) {
    let id = req.params.id
    User.findById(id, function(err, user) {
        res.json(user)
    })
})

router.route('/add').post(function(req, res) {
    let user = new User(req.body)
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding user failed')
        })
})

router.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('data not found')
        else 
            user.email = req.body.email
            user.name = req.body.name
            user.password = req.body.password

            user.save().then(user => {
                res.json('user updated')
            })
            .catch(err => {
                res.status(400).send('updating user failed')
            })
    })
})

app.use('/users', router)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});