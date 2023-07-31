import db from "../db.js"

export const commonGet = (req, res) => {
  const q = "SELECT * FROM common"
  db.query(q, (err, data) => {
    if (err) return res.json(err)

    return res.json(data)
  })
}

export const commonGetById = (req, res) => {
  const userId = req.params.id
  const q = "SELECT * FROM common WHERE id = ?;"
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err)

    return res.json(data)
  })
}

export const commonPost = (req, res) => {
  const { companyName, EmployeeName, department } = req.body

  const q =
    "INSERT INTO common (`companyName`, `EmployeeName`, `department`) VALUES (?)"
  const values = [companyName, EmployeeName, department]

  try {
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      return res.json("common posted successfully")
    })
  } catch (err) {
    console.error(err)
    return res.json(err)
  }
}

export const commonDelete = (req, res) => {
  const userId = req.params.id

  const q = "DELETE FROM common WHERE id = ? "
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err)
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.json("common has been deleted!")
  })
}

export const commonUpdate = (req, res) => {
  const { id, companyName, EmployeeName, department } = req.body

  const q =
    "UPDATE common SET `companyName` = ?, `EmployeeName`= ?, `department`= ? WHERE id = ?"

  const values = [companyName, EmployeeName, department, id]
  db.query(q, [...values], (err, data) => {
    if (err) return res.send(err)
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }
    return res.json("user has been updated!")
  })
}
