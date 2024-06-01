const db = require("../models")
const { createToken } = require("../middleware/verifyToken")

const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
        const { email, username, password, password2 } = req.body

        if (password !== password2) {
            return res.status(400).json({ message: "Password does not match" })
        }

        const query = db.User.find()
        query.or([{ username: username }, { email: email }])
        const foundUser = await query.exec()

        if (foundUser.length !== 0) {
            return res.status(400).json({ message: "Username or email taken." })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        req.body.password = hash
        const createdUser = await db.User.create(req.body)
        await createdUser.save()

        return res.status(201).json({ message: "User successfully registered", userId: createdUser.id })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error", message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { password, username } = req.body

        const query = db.User.find({ username })

        const foundUser = await query.exec()

        if (foundUser.length === 0) {
            return res.status(400).json({ error: "User not found" })
        }

        const verifyPassword = await bcrypt.compare(password, foundUser[0].password)
        if (!verifyPassword) {
            return res.status(400).json({ error: "Invalid login credentials" })
        }
        const token = createToken(foundUser[0])
        return res.status(200).json({ token, id: foundUser[0]._id })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error", error: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.user.id
        const query = db.User.findById(id)

        query.select("-password")
        const foundUser = await query.exec()
        const foundProfile = await db.Profile.find({ User: id })
        if (!foundUser) {
            return res.status(400).json({ error: "User not found" })
        }
        return res.status(200).json({ message: "Successfully found user", data: {user: foundUser, profile:foundProfile[0]} })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    register,
    login,
    getUser
}