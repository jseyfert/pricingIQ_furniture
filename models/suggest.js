var mongoose = require('mongoose');

var SuggestSchema = new mongoose.Schema({
  suggest: { type: Array, required: true }
});

module.exports = mongoose.model('Suggest', SuggestSchema);