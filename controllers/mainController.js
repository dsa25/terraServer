const db = require("../db")

class mainController {
  async getUsers(req, reply) {
    try {
      let sql = "SELECT * FROM `users` WHERE status = 1"
      let users = await db.query(sql)
      reply.send(JSON.stringify(users[0]))
    } catch (error) {
      console.log(error)
    }
  }

  async allInspects(req, reply) {
    try {
      let sql = "SELECT * FROM `inspections` ORDER BY `id` DESC"
      let inspections = await db.query(sql)
      // setTimeout(() => {
      // }, 2000)
      reply.send(JSON.stringify(inspections[0]))
    } catch (error) {
      console.log(error)
    }
  }

  async allVers(req, reply) {
    try {
      let sql = "SELECT id, v FROM `inspections` ORDER BY `id` DESC"
      let inspections = await db.query(sql)
      reply.send(JSON.stringify(inspections[0]))
    } catch (error) {
      console.log(error)
    }
  }

  async getEditedInspects(req, reply) {
    try {
      if (req.body == undefined || req.body.listId == undefined) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Не передан необходимый параметр!",
          })
        )
      }
      let sqlArr = req.body.listId.join(", ")
      console.log("sqlArr", sqlArr)
      let sql = "SELECT * FROM `inspections` WHERE `id` IN (" + sqlArr + ")"
      let inspections = await db.query(sql)
      reply.send(JSON.stringify(inspections[0]))
    } catch (error) {
      console.log(error)
    }
  }

  async allNewInspects(req, reply) {
    try {
      if (req.body == undefined || req.body.id == undefined) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Не передан необходимый параметр!",
          })
        )
      }
      let id = req.body.id
      let sql = "SELECT * FROM `inspections` WHERE `id` > ?"
      let inspections = await db.query(sql, [id])
      reply.send(
        JSON.stringify({
          status: 1,
          body: inspections[0],
          msg: "Новые осмотры!",
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async addInspect(req, reply) {
    try {
      if (req.body == undefined) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не передан параметр!",
          })
        )
      }
      let DL = JSON.stringify(req.body.DL)
      let args = [
        req.body.type,
        req.body.v,
        req.body.date,
        "server",
        req.body.fio,
        req.body.keyLS,
        req.body.address,
        req.body.measur,
        DL,
      ]
      let sql =
        "INSERT INTO inspections (type, v, date, status, fio, keyLS, address, measur, DL) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
      let res = await db.query(sql, args)
      if (res[0].insertId) {
        let inspect = await db.query(
          `SELECT * FROM inspections WHERE id =${res[0].insertId}`
        )
        reply.send(
          JSON.stringify({
            status: 1,
            body: inspect[0],
            msg: "Осмотр сохранен в бд!",
          })
        )
      }
      reply.send(
        JSON.stringify({ status: 0, body: {}, msg: "Что то пошло не так!" })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async updateInspect(req, reply) {
    try {
      if (req.body == undefined || req.body.id == undefined) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Не передан необходимый параметр!",
          })
        )
      }
      let DL = JSON.stringify(req.body.DL)
      let args = [
        req.body.type,
        req.body.v,
        req.body.date,
        "server",
        req.body.fio,
        req.body.keyLS,
        req.body.address,
        req.body.measur,
        DL,
        req.body.id,
      ]
      let sql =
        "UPDATE inspections SET type= ?, v= ?, date= ?, status= ?, fio= ?, keyLS= ?, address= ?, measur= ?, DL= ? WHERE id= ?"
      let res = await db.query(sql, args)
      if (res[0].changedRows == 1) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: res[0],
            msg: "Изменения сохранены в БД!",
          })
        )
      }
      reply.send(
        JSON.stringify({ status: 0, body: res[0], msg: "Что то пошло не так!" })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req, reply) {
    try {
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new mainController()
