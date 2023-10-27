const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attempted: {
    type: Number,
  },
  correct:{
    type: Number
  },
  attempt_time:{
    type: Date
  }
},{timestamps: true});


const Result = new mongoose.model('result', ResultSchema);

module.exports = Result;