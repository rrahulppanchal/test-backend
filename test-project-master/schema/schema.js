import { body } from "express-validator";

export const userSchema = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("description").notEmpty().withMessage("Description is required"),
];

export const registerSchema = [
  body("name").notEmpty().withMessage("Name is required!"),
  body("email").isEmail().withMessage("Invalid email address!"),
  body("username").notEmpty().withMessage("Username is required!"),
  body("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password is not strong!"),
];
