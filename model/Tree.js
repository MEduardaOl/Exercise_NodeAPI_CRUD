const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tree = new Schema({
  nomePopular: {
    type: String
  },
  nomeCientifico: {
    type: String
  },
  familia: {
    type: String
  },
  altura: {
    type: Number
  },
  origem: {
    type: String
  }
},{
    collection: 'tree'
});

module.exports = mongoose.model('Tree', Tree);