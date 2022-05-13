let { opn } = require("./database/db")
// let { pool } = require("./database/db")
// const db = pool
const pageController = require("./pageController")

class mainController {
  async getUsers(req, reply) {
    try {
      let sql = "SELECT * FROM `users` WHERE status = 1"
      let db = await opn()
      let users = await db.all(sql)
      // let users = await db.query(sql)
      console.log("users", users)
      reply.send(
        JSON.stringify({
          status: 1,
          body: users,
          msg: "Список пользователей!",
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async addUser(req, reply) {
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
      if (
        req.body.fio.trim().length == 0 ||
        req.body.groupDop.trim().length == 0 ||
        req.body.status == undefined ||
        req.body.post == undefined
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!",
          })
        )
        return
      }
      let args = [
        req.body.fio.trim(),
        req.body.post,
        req.body.groupDop.trim(),
        req.body.status,
      ]
      let sql =
        "INSERT INTO `users`(`fio`, `post`, `groupDop`, `status`) VALUES ( ?, ?, ?, ?)"
      let db = await opn()
      let res = await db.run(sql, args)
      console.log("res", res)
      // res { stmt: Statement { stmt: undefined }, lastID: 3, changes: 1 }
      if (res && res?.lastID > 0) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: { id: res.lastID },
            msg: "Успех!",
          })
        )
      }
      JSON.stringify({
        status: 0,
        body: {},
        msg: "что то пошло не так!",
      })
    } catch (error) {
      console.log(error)
    }
  }

  async addAllUser(req, reply) {
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
      console.log("req.body", req.body)
      let db = await opn()
      let truncate = await db.run("DELETE FROM  users")
      // resq { stmt: Statement { stmt: undefined }, lastID: 0, changes: 23 }
      if (truncate != undefined) {
        console.log("truncate", truncate)
        let values = req.body
          .map(
            (item) => `(${item.id}, 
        '${item.fio}', 
        ${item.post}, 
        '${item.groupDop}', 
        ${item.status})`
          )
          .join(", ")
        let sql = `INSERT INTO users (id, fio, post, groupDop, status) VALUES ${values}`
        let res = await db.run(sql)
        // { stmt: Statement { stmt: undefined }, lastID: 6, changes: 3 }
        if (res && res?.lastID > 0 && res?.changes > 0) {
          reply.send(
            JSON.stringify({
              status: 1,
              body: { lastID: res.lastID, changes: res.changes },
              msg: "Успех!",
            })
          )
        }
      }

      JSON.stringify({
        status: 0,
        body: {},
        msg: "что то пошло не так!",
      })
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser(req, reply) {
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
      if (
        req.body.fio.trim().length == 0 ||
        req.body.groupDop.trim().length == 0 ||
        req.body.status == undefined ||
        req.body.id == undefined ||
        req.body.post == undefined
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "не все поля заполнены!",
          })
        )
      }
      let args = [
        req.body.fio.trim(),
        req.body.post,
        req.body.groupDop.trim(),
        req.body.status,
        req.body.id,
      ]
      let sql =
        "UPDATE users SET fio= ?, post= ?, groupDop= ?, status= ? WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      console.log("res", res)
      if (res && res?.changes == 1) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "F5!",
          })
        )
      }
      reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "что то пошло не так!",
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
        req.body.tprp,
        req.body.measur,
        DL,
      ]
      let sql =
        "INSERT INTO inspections (type, v, date, status, fio, keyLS, address, tprp, measur, DL) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      let db = await opn()
      let res = await db.run(sql, args)
      if (res != undefined && res.lastID > 0) {
        let file = `${req.hostname}/list/${res.lastID}`
        let sql2 = "UPDATE inspections SET file= ? WHERE id= ?"
        let res2 = await db.run(sql2, [file, res.lastID])
        if (res2 && res2?.changes == 1) {
          let inspect = await db.get(
            `SELECT * FROM inspections WHERE id =${res.lastID}`
          )
          reply.send(
            JSON.stringify({
              status: 1,
              body: inspect,
              msg: "Осмотр сохранен в бд!",
            })
          )
        }
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
        req.body.tprp,
        req.body.measur,
        DL,
        req.body.id,
      ]
      let sql =
        "UPDATE inspections SET type= ?, v= ?, date= ?, status= ?, fio= ?, keyLS= ?, address= ?,  tprp= ?, measur= ?, DL= ? WHERE id= ?"
      let db = await opn()
      let res = await db.run(sql, args)
      if (res && res?.changes == 1) {
        reply.send(
          JSON.stringify({
            status: 1,
            body: {},
            msg: "Изменения сохранены в БД!",
          })
        )
      }
      reply.send(
        JSON.stringify({
          status: 0,
          body: {},
          msg: "Что то пошло не так!",
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async getInspect(req, reply) {
    try {
      console.log(req.params.id)
      let sql = "SELECT * FROM `inspections` WHERE id = ?"
      let db = await opn()
      let inspection = await db.get(sql, [req.params.id])
      let html = new pageController("осмотр", inspection, req.hostname, req.url)
      reply.type("text/html").send(html.inspection)
    } catch (error) {
      console.log(error)
    }
  }

  async getListInspect(req, reply) {
    try {
      console.log(req.ip)
      console.log(req.hostname)
      console.log(req.url)
      let sql =
        "SELECT id, type, date, v, fio, keyLS, address, tprp, measur FROM `inspections` ORDER BY `id` DESC"
      let db = await opn()
      let listInspects = await db.all(sql)
      let html = new pageController(
        "Список осмотров",
        listInspects,
        req.hostname,
        req.url
      )
      reply.type("text/html").send(html.listInspects)
    } catch (error) {
      console.log(error)
    }
  }

  async getFormUsers(req, reply) {
    try {
      let sql = "SELECT * FROM `users` "
      let db = await opn()
      let users = await db.all(sql)
      let html = new pageController(
        "Пользователи",
        users,
        req.hostname,
        req.url
      )
      reply.type("text/html").send(html.users)
    } catch (error) {
      console.log(error)
    }
  }

  async allInspects(req, reply) {
    try {
      let sql = "SELECT * FROM `inspections` ORDER BY `id` DESC"
      let db = await opn()
      let inspections = await db.all(sql)
      // setTimeout(() => {
      // }, 2000)
      reply.send(
        JSON.stringify({
          status: 1,
          body: inspections,
          msg: "Список осмотров",
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  async filterInspects(req, reply) {
    try {
      if (
        req.body == undefined ||
        req.body.id == undefined ||
        req.body.date == undefined ||
        req.body.fio == undefined ||
        req.body.tprp == undefined ||
        req.body.address == undefined
      ) {
        reply.send(
          JSON.stringify({
            status: 0,
            body: {},
            msg: "Не передан необходимый параметр!",
          })
        )
      }
      let id = req.body.id.trim()
      let date = req.body.date.trim()
      let fio = req.body.fio.trim()
      let address = req.body.address.trim()
      let tprp = req.body.tprp.trim()

      let likes = []
      if (id != "") likes.push(`id LIKE '%${id}%'`)
      if (date != "") likes.push(`date LIKE '%${date}%'`)
      if (fio != "") likes.push(`fio LIKE '%${fio}%'`)
      if (address != "") likes.push(`address LIKE '%${address}%'`)
      if (tprp != "") likes.push(`tprp LIKE '%${tprp}%'`)

      let filter = likes.join(" AND ")
      if (filter != "") filter = `WHERE ${filter}`

      let sql = `SELECT id, type, date, v, fio, keyLS, address, tprp, measur FROM inspections ${filter} ORDER BY id DESC`
      let db = await opn()
      let inspections = await db.all(sql)
      let html = new pageController(
        "Список осмотров",
        inspections,
        req.hostname,
        req.url
      )
      reply.send(
        JSON.stringify({
          status: 1,
          body: { html: html.filterInspects },
          msg: "Список осмотров",
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  // async allVers(req, reply) {
  //   try {
  //     let sql = "SELECT id, v FROM `inspections` ORDER BY `id` DESC"
  //     let inspections = await db.query(sql)
  //     reply.send(JSON.stringify(inspections[0]))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async getEditedInspects(req, reply) {
  //   try {
  //     if (req.body == undefined || req.body.listId == undefined) {
  //       reply.send(
  //         JSON.stringify({
  //           status: 0,
  //           body: {},
  //           msg: "Не передан необходимый параметр!",
  //         })
  //       )
  //     }
  //     let sqlArr = req.body.listId.join(", ")
  //     console.log("sqlArr", sqlArr)
  //     let sql = "SELECT * FROM `inspections` WHERE `id` IN (" + sqlArr + ")"
  //     let inspections = await db.query(sql)
  //     reply.send(JSON.stringify(inspections[0]))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // async allNewInspects(req, reply) {
  //   try {
  //     if (req.body == undefined || req.body.id == undefined) {
  //       reply.send(
  //         JSON.stringify({
  //           status: 0,
  //           body: {},
  //           msg: "Не передан необходимый параметр!",
  //         })
  //       )
  //     }
  //     let id = req.body.id
  //     let sql = "SELECT * FROM `inspections` WHERE `id` > ?"
  //     let inspections = await db.query(sql, [id])
  //     reply.send(
  //       JSON.stringify({
  //         status: 1,
  //         body: inspections[0],
  //         msg: "Новые осмотры!",
  //       })
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

module.exports = new mainController()
