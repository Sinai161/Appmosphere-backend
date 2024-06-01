const { default: mongoose } = require("mongoose")
const User = require("./User")

const profileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    bio: { type: String, required: true },
    User: { type: mongoose.Types.ObjectId, ref: User },
    following: [String],
})



module.exports = mongoose.model("Profile", profileSchema)
