require("dotenv").config()
const app = require("fastify")({ trustProxy: true, logger: false })
// const { pool } = require("./database/db")
const { opn } = require("./database/db")
// const { sequelize } = require("./database/db")
const PORT = process.env.PORT || 80
const IP = process.env.IP || "192.168.0.101"
const mainController = require("./mainController")

app.register(require("@fastify/cors"))

app.register((app, opts, done) => {
  app.post("/users", mainController.getUsers)
  app.post("/addUser", mainController.addUser)
  app.post("/addAllUser", mainController.addAllUser)
  app.post("/updateUser", mainController.updateUser)

  app.post("/allInspects", mainController.allInspects)
  app.post("/addInspect", mainController.addInspect)
  app.post("/updateInspect", mainController.updateInspect)
  // app.post("/allNewInspects", mainController.allNewInspects)
  // app.post("/getEditedInspects", mainController.getEditedInspects)
  // app.post("/allVers", mainController.allVers)

  app.get("/list", mainController.getListInspect)
  app.get("/list/:id", mainController.getInspect)

  app.get("/", async (req, reply) => {
    try {
      console.log("ip", req.ip)
      console.log("ips", req.ips)
      console.log("hostname", req.hostname)
      console.log("protocol", req.protocol)
      reply.send("test")
    } catch (error) {
      console.log("error", error)
    }
  })

  done()
})

let time = new Date()

const start = async () => {
  try {
    // await pool.getConnection()
    let db = await opn()
    console.log("db", db)
    await app.listen(PORT, IP, (err, address) => {
      console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} server: ${address}`
      )
    })
  } catch (err) {
    app.log.error(err)
    console.log(err)
    process.exit(1)
  }
}

start()

// or

// модели для синхронизации
// const Inspection = require("./database/inspection")
// const Users = require("./database/users")
// синхронизация  бд c моделями
// sequelize
//   .sync({ alter: true })
//   // .sync()
//   .then(() => {
//     // start...
//     // start()
//     console.log("успешно update db ...")
//   })
//   .catch((err) => console.log(err))
