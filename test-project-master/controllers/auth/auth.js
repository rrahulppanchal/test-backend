import { validationResult } from "express-validator"
import db from "../../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verificationEmail } from "./verificationEmail.js"

export const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg)
  }

  const q = "SELECT * FROM users WHERE email = ?"

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length) return res.status(409).json("User already exists!")

    const { name, email, username } = req.body

    //hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    verificationEmail(hash)

    const q =
      "INSERT INTO users (`name`, `email`, `username`, `password`) VALUES (?)"
    const values = [name, email, username, hash]

    try {
      // db.query(q, [values], (err, data) => {
      //   if (err) return res.json(err)
      //   return res.json("user added successfully")
      // })
      res.json("doing something")
    } catch (err) {
      console.error(err)
      return res.json(err)
    }
  })
}

//refresh token
export const refreshToken = async (req, res, next) => {
  const token = req.header.authorization?.split(" ")[1]

  if (token) {
    jwt.verify(token, "mykey", (err, decoded) => {
      if (err) {
        const newToken = jwt.sign(
          {
            userd: data[1].userd,
            name: data[1].name,
            username: data[1].username,
            email: data[1].email,
          },
          "mykey",
          { expiresIn: "24h" }
        )
        res.setHeader("Authorization", `Bearer ${newToken}`)
      }
    })
  }
  next()
}

export const loginUser = async (req, res) => {
  const { email, password, username } = req?.body
  const q = "SELECT * FROM users WHERE email = ?"
  db.query(q, [email], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json("User not found!")

    // passwork check
    const isPassword = bcrypt.compareSync(password, data[0]?.password)
    if (!isPassword) return res.status(400).json("Wrong username or password!")

    const secretKey = "your_secret_key"

    const options = {
      expiresIn: "1h",
    }

    const payload = {
      name: data[0].name,
      userId: data[0].userId,
      usename: data[0].usename,
      pass: data[0].password,
      email: data[0].email,
    }

    const { pass, ...other } = payload

    const token = jwt.sign(payload, secretKey)

    if (req.cookies.token) {
      res.status(208).json("user already exists, check cookies")
    } else {
      res.status(200).cookie("token", token)
      res.status(200).json({
        useData: other,
      })
    }
  })
}

export const resetPassword = async () => {}

export const logoutUser = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) })
  res.status(200).json("User logged out")
}
