require("dotenv").config()
const app = require("fastify")({ logger: false })
const pool = require("./db")
const PORT = process.env.PORT || 5000
const mainController = require("./controllers/mainController")

app.register(require("fastify-cors"))

app.register((app, opts, done) => {
  app.post("/users", mainController.getUsers)
  app.post("/allInspects", mainController.allInspects)
  app.post("/allNewInspects", mainController.allNewInspects)
  app.post("/addInspect", mainController.addInspect)
  app.post("/updateInspect", mainController.updateInspect)
  app.post("/getEditedInspects", mainController.getEditedInspects)
  app.post("/allVers", mainController.allVers)

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
