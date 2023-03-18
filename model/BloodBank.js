const mongoose = require('mongoose')

const BloodSchema =  new mongoose.Schema({
  bloodGroup:{
    type:String,
    required:true
  },
  count:{
    type:Number,
    required:true
  },
  hospitalId:{
    type:String,
    required:true
  }
})

module.exports = new mongoose.model("BLOOD-BANK",BloodSchema)