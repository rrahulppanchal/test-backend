import express from "express"
import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../../controllers/auth/auth.js"

import { registerSchema } from "../../schema/schema.js"

const router = express.Router()

router.post("/register", registerSchema, registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/reset-password", resetPassword)

export default router
