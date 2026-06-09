const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

let db = null

const initializeDB = async () => {
  db = await open({
    filename: "./users.db",
    driver: sqlite3.Database,
  })

  console.log("Database Connected")
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `)
}

module.exports = { initializeDB, getDB: () => db }