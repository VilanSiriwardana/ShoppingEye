const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const outfitSchema = new mongoose.Schema({
  fitName: { 
    type: String, 
    required: true 
  },
  fitDescription: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }] // Store image URLs
}, { _id: false }); // No separate IDs for outfits



const bodyTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    outfits: [outfitSchema]  // Array of outfit objects
});

const BodyType = mongoose.model('BodyType', bodyTypeSchema);

module.exports = BodyType;