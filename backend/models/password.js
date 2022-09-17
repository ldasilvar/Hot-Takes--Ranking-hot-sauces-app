const passwordValidator = require("password-validator")

const passwordSchema = new passwordValidator();

//PasswordSchema for users setting the attributes passwords must meet
passwordSchema
.is().min(8)                   
.has().uppercase()              
.has().lowercase()              
.has().digits()                
.is().not().oneOf(['Password', 'Password123','A1234567'])   

module.exports = passwordSchema;