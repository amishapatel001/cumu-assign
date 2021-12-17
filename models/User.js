var mongoose = require('mongoose');
// db Schema here
const UserSchema = mongoose.Schema({
   name:{
     type:String,
     require:true
   },
   email:{
     type:String,
     require:true
   },
   password:{
    type:String,
    require:true
  }
});
module.exports = User = mongoose.model('UserSchema',UserSchema);