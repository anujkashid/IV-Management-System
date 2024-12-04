const mongoose = require('mongoose')

const FormData = mongoose.Schema({

        agenda_title:String,
        agenda_description:String,
        agenda_time:String,
});
module.exports= mongoose.model('agenda', FormData)