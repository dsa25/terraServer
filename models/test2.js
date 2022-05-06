const { sequelize } = require("../db")
const { Sequelize, DataTypes } = require("sequelize")

const Test2 = sequelize.define("test2", {
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
  fio3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Test2
