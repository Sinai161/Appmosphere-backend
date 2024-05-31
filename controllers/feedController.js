const db = require("../models")
/* 
GET /feed - query the Feed table and get all the posts - Bonus filter out your own posts
*/

const getFeed = async (req, res) => {
    try {
        const foundFeed = await db.Feed.find({})
        console.log(foundFeed)
        if (!foundFeed) {
            res.status(404).json({ message: "Cannot find feed" })
        } else {
            res.status(200).json({ data: foundFeed })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}

const createFeed = async (req, res) => {
    try {
        const createdFeed = await db.Feed.create({...req.body, User: req.user.id })
        createdFeed.save()
        console.log(createdFeed)
        if (!createFeed) {
            res.status(400).json({ message: "Cannot create feed" })
        } else {
            res.status(201).json({ data: createdFeed, message: "Feed created" })
        }
    } catch (err) { res.status(400).json({ error: err.message }) }
}


module.exports = {
    getFeed,
    createFeed
}