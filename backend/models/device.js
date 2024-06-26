const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    marque: { type: String, required: true },
    type: { type: String, required: true },
    serie: { type: String, required: true },
    tokenId: { type: String, required: true },
    serial: { 
        type: Number, 
        required: true,
    }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
