const mongoose = require('mongoose')

 const HospitalSchema = new mongoose.Schema({
  hospitalName:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    min:6
  },
  bloodSamples:{
    type:Array,
    default:[]
  }
 })

 module.exports = mongoose.model("HospitalDetails",HospitalSchema)