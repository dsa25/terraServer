const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
// sldkfjsl dkfalsdkfj
;(async () => {
  console.log("start.db")
  const db = await open({
    filename: "./dataBase/test.db",
    driver: sqlite3.Database,
  })

  // await db.migrate({
  //   migrationsPath: "./dataBase/migrate.sql",
  // })

  //   let cretss = await db.run(
  //     `CREATE TABLE users (id, fio, post, groupDop, status)`
  //   )

  //   await db.run(`ALTER TABLE users MODIFY id int NOT NULL AUTO_INCREMENT`)

  //   let sql = `INSERT INTO users (fio, post, groupDop, status) VALUES (?,?,?,?)`

  //   await db.run(sql, [
  //     users[0].fio,
  //     users[0].post,
  //     users[0].groupDop,
  //     users[0].status,
  //   ])

  //   let inspections = await db.exec(`CREATE TABLE "inspections" (
  // 	"id"	INTEGER,
  // 	"type"	TEXT,
  // 	"date"	TEXT,
  // 	"status"	TEXT,
  // 	"fio"	TEXT,
  // 	"keyLS"	TEXT,
  // 	"address"	TEXT,
  // 	"measur"	TEXT,
  // 	"DL"	TEXT,
  // 	"file"	TEXT,
  // 	PRIMARY KEY("id" AUTOINCREMENT)
  // )`)
  //   let res = await db.migrate({ force: true, migrationsPath: './migrations/schema.sql' })
  //     console.log(res)
})()

async function db() {
  return open({
    filename: "./dataBase/test.db",
    // sqlite3.OPEN_CREATE,
    driver: sqlite3.Database,
  })
}

module.exports = db
