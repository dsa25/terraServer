require("dotenv").config()
const app = require("fastify")({ trustProxy: true, logger: false })
// const { pool } = require("./database/db")
const { opn } = require("./database/db")
const PORT = process.env.PORT || 80
// const IP = process.env.IP || "192.168.0.103"
const IP = process.env.IP || "0.0.0.0"
const mainController = require("./mainController")

app.register(require("@fastify/cors"))

const path = require("path")
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "/public"),
  prefix: "/apk/",
})

app.register((app, opts, done) => {
  app.post("/users", mainController.getUsers)
  app.post("/addUser", mainController.addUser)
  app.post("/updateUser", mainController.updateUser)
  app.post("/addAllUser", mainController.addAllUser)

  app.post("/addInspect", mainController.addInspect)
  app.post("/updateInspect", mainController.updateInspect)
  app.post("/allInspects", mainController.allInspects)
  app.post("/filterInspects", mainController.filterInspects)
  // app.post("/allNewInspects", mainController.allNewInspects)
  // app.post("/getEditedInspects", mainController.getEditedInspects)
  // app.post("/allVers", mainController.allVers)

  app.get("/list", mainController.getListInspect)
  app.get("/list/:id", mainController.getInspect)
  app.get("/list/del/:id", mainController.delInspect)
  app.get("/users", mainController.getFormUsers)

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
    await app.listen({ port: PORT, host: IP }, (err, address) => {
      console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} server: ${address}`
      )
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    })
  } catch (err) {
    app.log.error(err)
    console.log(err)
    process.exit(1)
  }
}

start()
