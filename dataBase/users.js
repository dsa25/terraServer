const { sequelize } = require("./db")
const { Sequelize, DataTypes } = require("sequelize")

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupDop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
)

let listUsers = [
  {
    id: 1,
    fio: "Иванов ИИ",
    post: 1,
    groupDop: "3",
    status: 1,
  },
  {
    id: 2,
    fio: "Смирнов СИ",
    post: 1,
    groupDop: "5",
    status: 1,
  },
  {
    id: 3,
    fio: "Лебедев АИ",
    post: 1,
    groupDop: "3",
    status: 1,
  },
  {
    id: 4,
    fio: "Попов ПИ",
    post: 1,
    groupDop: "5",
    status: 1,
  },
  {
    id: 5,
    fio: "Кузнецов ВП",
    post: 0,
    groupDop: "2",
    status: 1,
  },
  {
    id: 6,
    fio: "Соколов ИР",
    post: 0,
    groupDop: "3",
    status: 1,
  },
  {
    id: 7,
    fio: "Новиков ТП",
    post: 0,
    groupDop: "2",
    status: 1,
  },
  {
    id: 8,
    fio: "Морозов КР",
    post: 0,
    groupDop: "3",
    status: 1,
  },
]

module.exports = { Users }
