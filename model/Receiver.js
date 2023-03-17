const mongoose = require('mongoose')

const ReceiverSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    unique:true,
    required:true
  }
})

module.exports = mongoose.model("ReceiverDetails",ReceiverSchema)