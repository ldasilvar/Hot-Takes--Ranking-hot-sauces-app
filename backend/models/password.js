const passwordValidator = require("password-validator")

const passwordSchema = new passwordValidator();


passwordSchema
.is().min(8)                   
.has().uppercase()              
.has().lowercase()              
.has().digits()                
.is().not().oneOf(['Password', 'Password123','A1234567'])   

module.exports = passwordSchema;