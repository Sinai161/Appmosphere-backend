require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

const routes = require("./controllers")

console.log("MONGO", MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.use((req, res) => {
    res.status(404).json({ message: "These are not the routes you're looking for ..." })
})

app.listen(process.env.PORT, () => {
    console.log("Connected and Running")
})