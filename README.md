# Appmosphere

## Appmosphere is a social app where you can create a profile and post.

## Tech Stack

### Mongodb/Mongoose
### Express
### Node
### JWT/Bcrypt

## Getting Started


## Routes

router.post("/register")
router.post("/login")

## Profile
router.get("/profile", profileCtrl.getProfile)
router.post("/profile", profileCtrl.createProfile)
router.put("/profile/:id", profileCtrl.updateProfile)

## Feed
router.get("/feed",)
router.post("/feed",)

