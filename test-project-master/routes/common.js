import express from "express"
import {
  deleteUser,
  getUser,
  postUser,
  updateUser,
} from "../controllers/user.js"

import { userSchema } from "../schema/schema.js"
import { paginatedUserList } from "../controllers/pagination.js"
import {
  commonDelete,
  commonGet,
  commonGetById,
  commonPost,
  commonUpdate,
} from "../controllers/common.js"
import { TokenAuth } from "../middlewares/tokenAuth.js"

const router = express.Router()

router.get("/common",TokenAuth, commonGet)
router.get("/common/:id",TokenAuth, commonGetById)
router.post("/common", TokenAuth,commonPost)
router.delete("/common/:id",TokenAuth, commonDelete)
router.put("/common",TokenAuth, commonUpdate)

export default router
