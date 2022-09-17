// mongopassword: H758cCT5ZwVm3ZiQ
// mongodb+srv://ldasilva:<password>@cluster0.fkx6iiz.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const usersRoutes = require('./routes/users');

//Used for the path of the images
const path = require('path');

//Puts a cap on the number of actions a user can repeat from the same IP address to protect the website from brute attacks
const rateLimit = require("./middleware/limit");

const app = express();

//Used to connect to MongoDB with my username and my password
mongoose.connect('mongodb+srv://ldasilva:H758cCT5ZwVm3ZiQ@cluster0.fkx6iiz.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log('succesful connection to mongoose');
  
})
.catch((error)=>{
  console.log('unable to connect to mongoose');
  console.error(error);
})

app.use(rateLimit);

app.use (express.json());


//Headers for CORS//
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', usersRoutes);



module.exports = app;