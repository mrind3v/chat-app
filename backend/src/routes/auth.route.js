import express from "express" 
import { checkAuth, login, logout, signup, updateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

// app.use middleware sends HTTP req to Router(auth.route.js) and router has route handlers
// that define how our app responds when the client hits those specific endpoints. Router
// groups routes
const router = express.Router()


router.post("/signup", signup) // route handler that handles post req at /api/auth/signup
router.post("/logout", logout)
router.post("/login", login)
// run the protectRoute function first, and only then update profile
// because we only want authenticated users to be able to update their profile
// we'll check if user has a valid jwt
router.put("/update-profile", protectRoute, updateProfile) // put -> in order to update something
router.get("/check", protectRoute, checkAuth) 


export default router