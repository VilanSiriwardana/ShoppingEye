const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  shopLocation: { type: String, required: true },
  itemLocation: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }
});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
