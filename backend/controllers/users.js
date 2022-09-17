const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/users');

//Post request for new users to sign up 
exports.signup = (req, res, next) => {
  //bcrypt used to salt passwords by 10
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.status(201).json({
                message: 'User added successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: new Error ('Email already in use')
              });
            }
          );
        }
      );

};

//Post request for users to login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
          //Checks if a user does not exist
          if (!user) {
            return res.status(401).json({
              error: new Error('User not found!')
              
            });
          }
          //Checks the users password against the database
          bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Incorrect password!')
                });
              }
              //Provides a token when a user signs in that expires in 24h
              const token = jwt.sign(
                { userId: user._id },
                'EXTREMELY SUPER ULTRA RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
              res.status(200).json({
                userId: user._id,
                token: token
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );

};

