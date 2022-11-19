import express from "express"
import controller from "../controllers/auth"

const router = express.Router()

router.post('/register', controller.registerUser)
router.post('/login', controller.login)

export default router