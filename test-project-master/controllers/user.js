import { validationResult } from "express-validator";
import db from "../db.js";

//for geting user data
export const getUser = (req, res) => {
  const q = "SELECT * FROM test ";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
};

// for posting user data
export const postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg);
  }

  const { name, email, description } = req.body;

  const image = req.file;

  const q =
    "INSERT INTO test (`name`, `email`, `description`, `image`) VALUES (?)";
  const values = [name, email, description, image.path];

  try {
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("user posted successfully");
    });
  } catch (err) {
    console.error(err);
    return res.json(err);
  }
};

//for deleting user data
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const q = " DELETE FROM test WHERE id = ? ";
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json("user has been deleted!");
  });
};

//for updating user data
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg);
  }

  const q =
    " UPDATE test SET `name` = ?, `email`= ?, `description`= ? WHERE id = ? ";

  const values = [req.body.name, req.body.email, req.body.description];
  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.send(err);
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json("user has been updated!");
  });
};
