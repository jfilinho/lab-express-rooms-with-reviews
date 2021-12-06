
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: { type: String, maxlength: 200 },
    roomId: { type: Schema.Types.ObjectId, ref: "Rooms" },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 

});



module.exports = mongoose.model("Review", reviewSchema)
