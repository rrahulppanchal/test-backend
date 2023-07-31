import express from "express"
import userRoutes from "./routes/users.js"
import registerUser from "./routes/auth/auth.js"
import common from "./routes/common.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express(express.json())

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
app.use(multer({ storage: fileStorage }).single("image"))
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoutes)
app.use("/api/user", registerUser)
app.use("/api", common)

app.listen(8800, () => {
  console.log("Connected!")
})
