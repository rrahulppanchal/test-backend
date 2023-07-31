import express from "express"
import {
  deleteUser,
  getUser,
  postUser,
  updateUser,
} from "../controllers/user.js"

import { userSchema } from "../schema/schema.js"
import { paginatedUserList } from "../controllers/pagination.js"

const router = express.Router()

router.get("/get-user", paginatedUserList)
router.post("/post-user", userSchema, postUser)
router.delete("/delete-user/:id", deleteUser)
router.put("/update-user/:id", userSchema, updateUser)

export default router
