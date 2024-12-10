const mongoose = require('mongoose');

const myProject = new mongoose.Schema({
   college_name:String,
   number_of_students:String,
   Date_of_visit:Date,
   start_time:Date,
   end_time:Date,
   number_of_faculty:String,
   purpose:String,
   visting_location:String,
   student_details:String,
   faculty_details:String,
   comment:String,
   reason:{
      type:String,
      default:"null"
   },
   Visit_accept:{
      type:String,
      default:"pending",
   },
   Visit_status:{
      type:String,
       default:"incompleted"
   },

   notification_status:{
     type:String,
     default:"unseen"
   }
});
module.exports= mongoose.model('visit',myProject);
