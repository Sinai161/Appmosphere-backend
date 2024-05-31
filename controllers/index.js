const router = require("express").Router()
const authCtrl = require("./authController")
const { verifyToken } = require("../middleware/verifyToken")
const profileCtrl = require("./profileController")
const feedCtrl = require("./feedController")

/* 
profile-controller.js
- 'profilepage/create'
- 'profilepage/update/<id>'
- 'profilepage/delete/<id>'
- 'profilepage/<id>'
feed-controller.js
- 'feed/create'
- 'feed/update/<id>'
- 'feed/delete/<id>'
auth-controller.js
- 'login'
- 'register'
*/

// user routesls
router.post("/register", authCtrl.register)
router.post("/login", authCtrl.login)

// Protected Routes
router.use(verifyToken)

// Profile
router.get("/profile", profileCtrl.getProfile)
router.post("/profile", profileCtrl.createProfile)
router.put("/profile/:id", profileCtrl.updateProfile)

// Feed
router.get("/feed", feedCtrl.getFeed)
router.post("/feed", feedCtrl.createFeed)

module.exports = router
