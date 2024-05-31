const { default: mongoose } = require("mongoose")
const User = require("./User")

const feedSchema = new mongoose.Schema({
    User: { type: mongoose.Types.ObjectId, ref: User },
    img: { type: String, required: true },
})

module.exports = mongoose.model("Feed", feedSchema)
