const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema checking  that emails are unique

const userSchema = mongoose.Schema({
  email: { 
    type: String, 
    required: [true, "VALID_EMAIL_REQUIRED"], 
    unique: true },
  password: { 
  type: String, 
  required: [true, "VALID_PASSWORD_REQUIRED"]},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);