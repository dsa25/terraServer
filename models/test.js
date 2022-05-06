const { sequelize } = require("../db")
const { Sequelize, DataTypes } = require("sequelize")

const Test = sequelize.define("test", {
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
})

module.exports = Test
