const mongoose = require('mongoose')

const FormData = mongoose.Schema({
        
        name:String,
        username:String,
        password:String,
        
});
module.exports= mongoose.model('admin', FormData)