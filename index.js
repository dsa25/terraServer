require("dotenv").config()
const app = require("fastify")({ logger: false })
const path = require("path")
const pool = require("./db")
const PORT = process.env.PORT || 5000
const mainController = require("./mainController")

app.register(require("@fastify/cors"))

// app.register(require("@fastify/static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/public/",
// })

app.register((app, opts, done) => {
  app.post("/users", mainController.getUsers)
  app.post("/allInspects", mainController.allInspects)
  app.post("/addInspect", mainController.addInspect)
  app.post("/updateInspect", mainController.updateInspect)
  // app.post("/allNewInspects", mainController.allNewInspects)
  // app.post("/getEditedInspects", mainController.getEditedInspects)
  // app.post("/allVers", mainController.allVers)

  app.get("/list", mainController.getListInspect)
  app.get("/list/:id", mainController.getInspect)

  done()
})

let time = new Date()

const start = async () => {
  try {
    await pool.getConnection()
    await app.listen(PORT, (err, address) => {
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
