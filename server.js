require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

const routes = require("./controllers")

const PORT = process.env.PORT || 4000;
console.log("PORT", PORT)
console.log("MONGO", MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)

app.use((req, res) => {
    res.status(404).json({ message: "These are not the routes you're looking for ..." })
})

app.listen(PORT, () => {
    console.log("Connected and Running")
})