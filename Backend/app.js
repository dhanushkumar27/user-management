const express = require("express")
const { initializeDB } = require("./database")

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const { getDB } = require("./database")

app.post("/users", async (req, res) => {
  const { name, email } = req.body

  const db = getDB()

  await db.run(
    `
      INSERT INTO users(name,email)
      VALUES (?,?)
    `,
    [name, email]
  )

  res.send("User Added")
})

app.get("/users", async (req, res) => {
  const db = getDB()

  const users = await db.all(`
    SELECT * FROM users
  `)

  res.send(users)
})

app.put("/users/:id", async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  const db = getDB()

  await db.run(
    `
      UPDATE users
      SET name = ?, email = ?
      WHERE id = ?
    `,
    [name, email, id]
  )

  res.send("User Updated")
})

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  const db = getDB()

  await db.run(
    `
      DELETE FROM users
      WHERE id = ?
    `,
    [id]
  )

  res.send("User Deleted")
})

initializeDB()

app.listen(3000, () => {
  console.log("Server Running")
})