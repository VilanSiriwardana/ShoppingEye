const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  ownerName: { type: String, required: true },
  shopCategory: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  shopLogo: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const ShopModel = mongoose.model('Shop', ShopSchema);
module.exports = ShopModel;
