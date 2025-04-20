const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    jobtitle: String,
    company: String,
    location: String,
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    },
    salary:{
      min: {type:Number, required:true},
      max:{type:Number, required:true}
    },
    description: String,
    requirements: String,
    responsibilities: String,
    deadline: Date,
  },{
    timestamps:true
  });

  const Company = mongoose.model('job',Schema)
  module.exports = {Company}