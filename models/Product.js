const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold:Boolean,
  dateOfSale : Date,
  rating: {
    rate: Number,
    count: Number
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
