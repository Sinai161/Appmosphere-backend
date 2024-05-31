const router = require("express").Router()
const authCtrl = require("./authController")
const { verifyToken } = require("../middleware/verifyToken")

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

// user routes
router.post("/register", authCtrl.register)
router.post("/login", authCtrl.login)

// Protected Routes
router.use(verifyToken)

module.exports = router
