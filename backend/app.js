// mongopassword: H758cCT5ZwVm3ZiQ
// mongodb+srv://ldasilva:<password>@cluster0.fkx6iiz.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://ldasilva:H758cCT5ZwVm3ZiQ@cluster0.fkx6iiz.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log('succesful connection to mongoose');
  
})
.catch((error)=>{
  console.log('unable to connect to mongoose');
  console.error(error);
})



app.use (express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());





module.exports = app;