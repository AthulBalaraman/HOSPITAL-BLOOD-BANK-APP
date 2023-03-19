const mongoose = require('mongoose')

const RequestSchema = mongoose.Schema({
  receiverId:{
    type:String,
    required:true
  },
  bloodSampleId:{
    type:String,
    required:true,
  },
  hospitalId:{
    type:String,
    required:true
  },
  requestStatus:{
    type:Boolean,
    default:false,
    required:true
  },
  bloodGroup:{
    type:String,
    required:true
  }
},
{
  timestamps:true
})

module.exports = new mongoose.model("requests",RequestSchema)