const db = require("../models")
/* 
GET /profile - gets your own profile from DB
GET /profile/{id} - gets a single profile from DB along with the feed/posts of that person - Query both the profile and the feeds of the ID in query params
PUT /profile - allows us to update our own profile 
*/
const getProfile = async (req, res) => {
    try {
        const foundProfile = await db.Profile.find({User: req.user.id })
        const foundFeed = await db.Feed.find({User: req.user.id })
        console.log(foundProfile)
        console.log(foundFeed)
        if (!foundProfile) {
            res.status(404).json({ message: "Cannot find Profile" })
        } else {
            res.status(200).json({ data: foundProfile })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}
const createProfile = async (req, res) => {
    try {
        const createdProfile = await db.Profile.create({...req.body, User: req.user.id })
        createdProfile.save()
        console.log(createdProfile)
        if (!createProfile) {
            res.status(400).json({ message: "Cannot create profile" })
        } else {
            res.status(201).json({ data: createdProfile, message: "Profile created" })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}

const updateProfile = async (req, res) => {
    try {
        const updatedProfile = await db.Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedProfile) {
            res.status(400).json({ message: "Could not update Profile" })
        } else {
            res.status(200).json({ Data: updatedProfile, message: "Profile Updated" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}



module.exports = {
    getProfile,
    createProfile,
    updateProfile
}