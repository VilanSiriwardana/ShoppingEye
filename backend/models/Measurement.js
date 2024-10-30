const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
    userId: {
        type: String,
       
    },
    bust: {
        type: Number,
        required: true
    },

    waist: {
        type: Number,
        required: true
    },
    
    hip: {
        type: Number,
        required: true
    },

    bodyType: {
        type: String
    },
    
    undertone: {
        type: String
    },
    isPersonal: {
        type: Boolean
    },
    saveName: {
        type: String
    }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
