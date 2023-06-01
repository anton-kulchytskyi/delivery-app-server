const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  foods: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Shop', ShopSchema);