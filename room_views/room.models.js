
const mongoose = require("mongoose");


const roomSchema  = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    reviews: [],
});

module.exports = mongoose.model("Room", roomSchema);





